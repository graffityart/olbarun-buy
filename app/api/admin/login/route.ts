import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { makeAdminToken } from '../../../../lib/qnaAuth';

export const runtime='nodejs';

function safeEqual(aValue:string,bValue:string){const a=Buffer.from(aValue);const b=Buffer.from(bValue);return a.length===b.length&&timingSafeEqual(a,b);}

export async function POST(request:Request){
 try{
  const configuredUser=process.env.ADMIN_USERNAME||'admin';
  const configuredPassword=process.env.ADMIN_PASSWORD;
  if(!configuredPassword)return NextResponse.json({ok:false,message:'관리자 비밀번호가 설정되지 않았습니다.'},{status:503});
  const body=await request.json();
  const username=String(body.username||'');
  const password=String(body.password||'');
  if(!safeEqual(username,configuredUser)||!safeEqual(password,configuredPassword))return NextResponse.json({ok:false,message:'관리자 아이디 또는 비밀번호가 일치하지 않습니다.'},{status:401});
  const res=NextResponse.json({ok:true});
  res.cookies.set('olbarun_admin',makeAdminToken(),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:8*60*60});
  return res;
 }catch{return NextResponse.json({ok:false,message:'로그인 중 오류가 발생했습니다.'},{status:500});}
}
