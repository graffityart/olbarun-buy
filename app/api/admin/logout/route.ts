import {NextResponse} from 'next/server';
export async function GET(request:Request){
 const url=new URL(request.url);const next=url.searchParams.get('next');const path=next&&next.startsWith('/')&&!next.startsWith('//')?next:'/customer/qna';
 const res=NextResponse.redirect(new URL(path,request.url));
 res.cookies.set('olbarun_admin','',{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:0});
 return res;
}