import { db } from '../../../lib/db';
import styles from '../board.module.css';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '../../../lib/qnaAuth';

export const dynamic='force-dynamic';

type Notice={id:number|string,title:string,created_at:string|Date,view_count:number|string};
export default async function NoticePage(){
 const store=await cookies(); const isAdmin=verifyAdminToken(store.get('olbarun_admin')?.value);
 const sql=db();
 let notices:Notice[]=[];
 try{notices=(await sql`SELECT id,title,created_at,view_count FROM notices WHERE is_published=TRUE ORDER BY created_at DESC LIMIT 100`) as Notice[];}catch{}
 return <main className={styles.page}>
<header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav><a href="/request/visit" className="btn btnPrimary smallBtn">빠른 견적 문의</a></div></header>
<section className={styles.hero}><div className="container"><p className="sectionKicker">CUSTOMER CENTER</p><h1>고객센터</h1><p>올바른매입의 공지사항과 1:1 문의를 확인할 수 있습니다.</p><div className={styles.boardTabs}><a className={styles.active} href="/customer/notice">공지사항</a><a href="/customer/qna">질문답변 (1:1)</a></div></div></section>
<section className={styles.content}><div className="container"><div className={styles.boardHead}><div><h2>공지사항</h2><p>서비스 이용에 필요한 주요 소식을 안내합니다.</p></div><div style={{display:'flex',gap:8}}>{isAdmin?<><a className={styles.adminBadge} href="/admin/notice/write">공지 작성</a><a className={styles.adminBadge} href="/api/admin/logout?next=/customer/notice">로그아웃</a></>:<a className={styles.adminBadge} href="/admin/login?next=/customer/notice">관리자 접속</a>}</div></div><table className={styles.table}><thead><tr><th>번호</th><th className={styles.title}>제목</th><th>작성일</th><th>조회</th></tr></thead><tbody>{notices.length===0?<tr><td colSpan={4} className={styles.empty}>등록된 공지사항이 없습니다.</td></tr>:notices.map((notice,index)=><tr key={String(notice.id)}><td>{notices.length-index}</td><td className={styles.title}><a href={`/customer/notice/${notice.id}`}>{notice.title}</a>{isAdmin&&<a href={`/customer/notice/${notice.id}`} style={{marginLeft:10,fontSize:12,fontWeight:800,color:'#0c63d4'}}>수정·삭제</a>}</td><td>{new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(notice.created_at))}</td><td>{String(notice.view_count)}</td></tr>)}</tbody></table></div></section>
</main>;}
