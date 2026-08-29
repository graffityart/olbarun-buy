import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '../../../../lib/db';
import { verifyAdminToken } from '../../../../lib/qnaAuth';

export const runtime='nodejs';

export async function POST(request:Request){
 try{
  const store=await cookies();
  if(!verifyAdminToken(store.get('olbarun_admin')?.value))return NextResponse.json({ok:false,message:'관리자 로그인이 필요합니다.'},{status:401});
  const body=await request.json();
  const title=String(body.title||'').trim(); const content=String(body.content||'').trim();
  if(title.length<2||title.length>160)return NextResponse.json({ok:false,message:'제목을 확인해주세요.'},{status:400});
  if(content.length<2||content.length>10000)return NextResponse.json({ok:false,message:'내용을 확인해주세요.'},{status:400});
  const sql=db();
  const rows=await sql`INSERT INTO notices (title,content,is_published) VALUES (${title},${content},TRUE) RETURNING id`;
  return NextResponse.json({ok:true,id:rows[0]?.id});
 }catch{return NextResponse.json({ok:false,message:'공지 등록 중 오류가 발생했습니다.'},{status:500});}
}
