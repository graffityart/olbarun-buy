import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {db} from '../../../../../lib/db';
import {verifyAdminToken} from '../../../../../lib/qnaAuth';
export const runtime='nodejs'; export const dynamic='force-dynamic';
const clean=(v:unknown,max:number)=>String(v??'').trim().slice(0,max);
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 const jar=await cookies(); if(!verifyAdminToken(jar.get('olbarun_admin')?.value))return NextResponse.json({ok:false,message:'관리자 로그인이 필요합니다.'},{status:401});
 const {id}=await params; if(!/^\d+$/.test(id))return NextResponse.json({ok:false,message:'잘못된 요청입니다.'},{status:400});
 try{const body=await request.json();const title=clean(body.title,160),nickname=clean(body.nickname,40),content=clean(body.content,5000),answer=clean(body.answer,5000);
 if(!title||!nickname||content.length<5)return NextResponse.json({ok:false,message:'제목, 작성자, 문의 내용을 확인해 주세요.'},{status:400});
 const sql=db();const rows=await sql`UPDATE qna_posts SET title=${title},nickname=${nickname},content=${content},admin_answer=${answer||null},status=${answer?'answered':'waiting'},updated_at=NOW() WHERE id=${Number(id)} RETURNING id`;
 if(!rows[0])return NextResponse.json({ok:false,message:'게시글을 찾을 수 없습니다.'},{status:404});
 return NextResponse.json({ok:true});}catch(e){console.error(e);return NextResponse.json({ok:false,message:'저장 중 오류가 발생했습니다.'},{status:500});}
}
export async function DELETE(_request:Request,{params}:{params:Promise<{id:string}>}){
 const jar=await cookies(); if(!verifyAdminToken(jar.get('olbarun_admin')?.value))return NextResponse.json({ok:false,message:'관리자 로그인이 필요합니다.'},{status:401});
 const {id}=await params; if(!/^\d+$/.test(id))return NextResponse.json({ok:false,message:'잘못된 요청입니다.'},{status:400});
 try{const sql=db();const rows=await sql`DELETE FROM qna_posts WHERE id=${Number(id)} RETURNING id`;if(!rows[0])return NextResponse.json({ok:false,message:'게시글을 찾을 수 없습니다.'},{status:404});return NextResponse.json({ok:true});}
 catch(e){console.error(e);return NextResponse.json({ok:false,message:'삭제 중 오류가 발생했습니다.'},{status:500});}
}