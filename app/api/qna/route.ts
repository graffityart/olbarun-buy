import { NextResponse } from 'next/server';
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { db } from '../../../lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

function securitySecret() {
  const value = process.env.CAPTCHA_SECRET || process.env.ADMIN_SECRET;
  if (!value) throw new Error('CAPTCHA_SECRET is not configured.');
  return value;
}

function verifyCaptcha(token: string, answer: string) {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf8');
    const [expected, expires, sig] = raw.split(':');
    if (!expected || !expires || !sig || Number(expires) < Date.now()) return false;
    const payload = `${expected}:${expires}`;
    const actual = createHmac('sha256', securitySecret()).update(payload).digest('hex');
    if (actual.length !== sig.length || !timingSafeEqual(Buffer.from(actual), Buffer.from(sig))) return false;
    return expected === answer.trim();
  } catch { return false; }
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function ipHash(request: Request) {
  const raw = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  return createHash('sha256').update(`${securitySecret()}:${raw}`).digest('hex');
}

export async function GET() {
  try {
    const sql = db();
    const rows = await sql`SELECT id, nickname, title, is_secret, status, created_at FROM qna_posts ORDER BY id DESC LIMIT 50`;
    return NextResponse.json({ ok: true, posts: rows });
  } catch (error) {
    console.error('qna list error:', error);
    return NextResponse.json({ ok: false, message: '게시글을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });

    const nickname = clean(body.nickname, 40);
    const password = clean(body.password, 60);
    const title = clean(body.title, 160);
    const content = clean(body.content, 5000);
    const captcha = clean(body.captcha, 20);
    const captchaToken = clean(body.captchaToken, 1000);
    const isSecret = body.secret !== false;

    if (!nickname || password.length < 4 || !title || content.length < 5) {
      return NextResponse.json({ ok: false, message: '필수 입력항목을 확인해 주세요.' }, { status: 400 });
    }
    if (!verifyCaptcha(captchaToken, captcha)) {
      return NextResponse.json({ ok: false, message: '스팸 방지 계산값이 올바르지 않거나 만료되었습니다.' }, { status: 400 });
    }

    const sql = db();
    const ip = ipHash(request);
    const recent = await sql`SELECT COUNT(*)::int AS count FROM qna_posts WHERE ip_hash = ${ip} AND created_at > NOW() - INTERVAL '10 minutes'`;
    if (Number(recent[0]?.count || 0) >= 3) {
      return NextResponse.json({ ok: false, message: '짧은 시간에 너무 많은 글을 등록했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 429 });
    }

    const passwordHash = hashPassword(password);
    const inserted = await sql`INSERT INTO qna_posts (nickname,password_hash,title,content,is_secret,ip_hash) VALUES (${nickname},${passwordHash},${title},${content},${isSecret},${ip}) RETURNING id`;
    return NextResponse.json({ ok: true, id: inserted[0]?.id });
  } catch (error) {
    console.error('qna create error:', error);
    return NextResponse.json({ ok: false, message: '문의 등록 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
