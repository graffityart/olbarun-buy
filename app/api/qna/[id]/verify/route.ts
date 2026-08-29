import { NextResponse } from 'next/server';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { db } from '../../../../../lib/db';
import { makePostAccessToken } from '../../../../../lib/qnaAuth';

export const runtime='nodejs';
export const dynamic='force-dynamic';

function verifyPassword(password:string,stored:string){
 const [salt,hash]=stored.split(':'); if(!salt||!hash)return false;
 const actual=scryptSync(password,salt,64).toString('hex');
 return actual.length===hash.length&&timingSafeEqual(Buffer.from(actual),Buffer.from(hash));
}

export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params; if(!/^\d+$/.test(id))return NextResponse.json({ok:false,message:'잘못된 요청입니다.'},{status:400});
 try{
  const body=await request.json(); const password=String(body.password||'');
  const sql=db(); const rows=await sql`SELECT password_hash FROM qna_posts WHERE id=${Number(id)} LIMIT 1`;
  const row=rows[0]; if(!row)return NextResponse.json({ok:false,message:'게시글을 찾을 수 없습니다.'},{status:404});
  if(!verifyPassword(password,String(row.password_hash)))return NextResponse.json({ok:false,message:'비밀번호가 일치하지 않습니다.'},{status:401});
  const res=NextResponse.json({ok:true});
  res.cookies.set(`qna_access_${id}`,makePostAccessToken(id),{httpOnly:true,secure:true,sameSite:'lax',path:`/customer/qna/${id}`,maxAge:1800});
  return res;
 }catch(e){console.error(e);return NextResponse.json({ok:false,message:'비밀번호 확인 중 오류가 발생했습니다.'},{status:500});}
}
