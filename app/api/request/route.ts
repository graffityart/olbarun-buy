import { NextResponse } from 'next/server';
import net from 'node:net';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max);
const onlyDigits = (value: string) => value.replace(/\D/g, '');

function sendIcodeSms(message: string, title: string): Promise<{ code: string; raw: string }> {
  const key = process.env.ICODE_TOKEN?.trim();
  const tel = onlyDigits(process.env.ICODE_ADMIN_PHONE || '');
  const cb = onlyDigits(process.env.ICODE_SENDER_PHONE || '');
  if (!key || !tel || !cb) throw new Error('문자 발송 환경변수가 설정되지 않았습니다.');

  const payload = { key, tel, cb, msg: message.slice(0, 1900), title, date: '', charset: 'utf-8' };
  const json = JSON.stringify(payload);
  const bytes = Buffer.byteLength(json, 'utf8');
  const packet = `06${String(bytes).padStart(4, '0')}${json}`;

  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: '211.172.232.124', port: 9201 });
    let response = '';
    let settled = false;
    const fail = (err: Error) => { if (settled) return; settled = true; socket.destroy(); reject(err); };
    socket.setTimeout(8000);
    socket.on('connect', () => socket.write(packet, 'utf8'));
    socket.on('data', chunk => {
      response += chunk.toString();
      if (response.length >= 8 && !settled) {
        settled = true;
        const code = response.slice(6, 8);
        socket.end();
        resolve({ code, raw: response });
      }
    });
    socket.on('timeout', () => fail(new Error('아이코드 서버 응답 시간이 초과되었습니다.')));
    socket.on('error', fail);
    socket.on('end', () => { if (!settled) fail(new Error('아이코드 서버 응답을 확인하지 못했습니다.')); });
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });

    const type = body.type === 'visit' ? '방문견적 의뢰' : body.type === 'free' ? '무상수거 신청' : '수거 신청';
    const name = clean(body.name, 80);
    const manager = clean(body.manager, 60);
    const phone = onlyDigits(clean(body.phone, 30));
    const email = clean(body.email, 120);
    const address = clean(body.address, 180);
    const preferredDate = clean(body.preferredDate, 30);
    const purpose = clean(body.purpose, 80);
    const items = clean(body.items, 300);
    const dataDestroy = clean(body.dataDestroy, 60);
    const access = clean(body.access, 180);
    const note = clean(body.note, 500);
    const attachment = clean(body.attachment, 120);

    if (!name || !manager || phone.length < 10 || !address || !preferredDate || !purpose || !items || !body.privacy) {
      return NextResponse.json({ ok: false, message: '필수 입력사항을 확인해 주세요.' }, { status: 400 });
    }

    const message = [
      `[올바른매입 ${type}]`,
      `상호/성명: ${name}`,
      `담당자: ${manager}`,
      `연락처: ${phone}`,
      email ? `이메일: ${email}` : '',
      `주소: ${address}`,
      `희망일: ${preferredDate}`,
      `의뢰목적: ${purpose}`,
      `품목/수량: ${items}`,
      dataDestroy ? `HDD 파기: ${dataDestroy}` : '',
      access ? `현장조건: ${access}` : '',
      attachment ? `첨부파일명: ${attachment}` : '',
      note ? `상세내용: ${note}` : ''
    ].filter(Boolean).join('\n');

    const result = await sendIcodeSms(message, `올바른매입 ${type}`);
    if (result.code !== '00' && result.code !== '17') {
      console.error('iCODE send failed:', result.code, result.raw);
      return NextResponse.json({ ok: false, message: '문자 알림 전송 중 오류가 발생했습니다.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('request api error:', error);
    return NextResponse.json({ ok: false, message: '접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 500 });
  }
}
