import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { makeAdminToken } from '../../../../lib/qnaAuth';

export const runtime='nodejs';

export async function POST(request:Request){
 try{
  const configured=process.env.ADMIN_PASSWORD;
  if(!configured)return NextResponse.json({ok:false,message:'관리자 비밀번호가 설정되지 않았습니다.'},{status:503});
  const body=await request.json(); const password=String(body.password||'');
  const a=Buffer.from(password); const b=Buffer.from(configured);
  const valid=a.length===b.length&&timingSafeEqual(a,b);
  if(!valid)return NextResponse.json({ok:false,message:'관리자 비밀번호가 일치하지 않습니다.'},{status:401});
  const res=NextResponse.json({ok:true});
  res.cookies.set('olbarun_admin',makeAdminToken(),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:8*60*60});
  return res;
 }catch{return NextResponse.json({ok:false,message:'로그인 중 오류가 발생했습니다.'},{status:500});}
}
