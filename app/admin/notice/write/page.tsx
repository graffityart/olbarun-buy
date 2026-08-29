import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminToken } from '../../../../lib/qnaAuth';
import NoticeWriteForm from './NoticeWriteForm';

export const dynamic='force-dynamic';

export default async function AdminNoticeWritePage(){
 const store=await cookies();
 if(!verifyAdminToken(store.get('olbarun_admin')?.value))redirect('/admin/login?next=/admin/notice/write');
 return <main><header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a></div></header><section className="section"><div className="container"><div style={{maxWidth:900,margin:'0 auto 28px'}}><p className="sectionKicker">ADMIN NOTICE</p><h1 style={{fontSize:36,margin:'8px 0'}}>공지사항 작성</h1><p style={{color:'#6f7d8e'}}>관리자 전용 공지사항 작성 화면입니다.</p></div><NoticeWriteForm/></div></section></main>;
}
