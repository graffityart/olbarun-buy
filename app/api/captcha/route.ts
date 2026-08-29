import { NextResponse } from 'next/server';
import { createHmac, randomInt } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function secret() {
  const value = process.env.CAPTCHA_SECRET || process.env.ADMIN_SECRET;
  if (!value) throw new Error('CAPTCHA_SECRET is not configured.');
  return value;
}

export async function GET() {
  try {
    const a = randomInt(2, 10);
    const b = randomInt(1, 10);
    const expires = Date.now() + 5 * 60 * 1000;
    const answer = a + b;
    const payload = `${answer}:${expires}`;
    const sig = createHmac('sha256', secret()).update(payload).digest('hex');
    const token = Buffer.from(`${payload}:${sig}`).toString('base64url');
    return NextResponse.json({ ok: true, question: `${a} + ${b}`, token, expires });
  } catch (error) {
    console.error('captcha error:', error);
    return NextResponse.json({ ok: false, message: '보안 확인을 불러오지 못했습니다.' }, { status: 500 });
  }
}
