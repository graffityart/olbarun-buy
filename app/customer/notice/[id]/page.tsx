import { notFound } from 'next/navigation';
import { db } from '../../../../lib/db';
import styles from '../../board.module.css';

export const dynamic='force-dynamic';
type Props={params:Promise<{id:string}>};
export default async function NoticeDetail({params}:Props){
 const {id}=await params; if(!/^\d+$/.test(id))notFound();
 const sql=db();
 const rows=await sql`UPDATE notices SET view_count=view_count+1 WHERE id=${Number(id)} AND is_published=TRUE RETURNING id,title,content,created_at,view_count`;
 const notice=rows[0]; if(!notice)notFound();
 return <main className={styles.page}><header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav></div></header><section className={styles.hero}><div className="container"><p className="sectionKicker">NOTICE</p><h1>공지사항</h1><div className={styles.boardTabs}><a className={styles.active} href="/customer/notice">공지사항</a><a href="/customer/qna">질문답변 (1:1)</a></div></div></section><section className={styles.content}><div className="container"><div style={{borderTop:'2px solid #24364c'}}><div style={{padding:'22px 18px',borderBottom:'1px solid #e2e7ed'}}><h2 style={{margin:'0 0 12px',fontSize:24}}>{String(notice.title)}</h2><p style={{margin:0,color:'#7a8796',fontSize:14}}>작성일 {new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(String(notice.created_at)))} · 조회 {String(notice.view_count)}</p></div><div style={{padding:'38px 18px',minHeight:220,lineHeight:1.9,whiteSpace:'pre-wrap'}}>{String(notice.content)}</div></div><div style={{marginTop:25,textAlign:'center'}}><a className={styles.writeButton} href="/customer/notice">목록으로</a></div></div></section></main>;
}
