import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '../../../../lib/db';
import { verifyAdminToken,verifyPostAccessToken } from '../../../../lib/qnaAuth';
import PasswordGate from './PasswordGate';
import styles from '../../board.module.css';

export const dynamic='force-dynamic';
type Props={params:Promise<{id:string}>};

export default async function QnaDetail({params}:Props){
 const {id}=await params; if(!/^\d+$/.test(id)) notFound();
 const sql=db();
 const metaRows=await sql`SELECT id,nickname,title,is_secret,status,created_at FROM qna_posts WHERE id=${Number(id)} LIMIT 1`;
 const meta=metaRows[0]; if(!meta) notFound();
 const jar=await cookies();
 const isAdmin=verifyAdminToken(jar.get('olbarun_admin')?.value);
 const hasPostAccess=verifyPostAccessToken(id,jar.get(`qna_access_${id}`)?.value);
 const allowed=!meta.is_secret||isAdmin||hasPostAccess;
 let post:any=meta;
 if(allowed){const rows=await sql`SELECT id,nickname,title,content,is_secret,status,admin_answer,created_at FROM qna_posts WHERE id=${Number(id)} LIMIT 1`;post=rows[0];}
 return <main className={styles.page}>
 <header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav>{isAdmin&&<span style={{fontSize:12,fontWeight:800,color:'#0c63d4'}}>관리자 접속</span>}</div></header>
 <section className={styles.hero}><div className="container"><p className="sectionKicker">1:1 Q&amp;A</p><h1>질문답변</h1><div className={styles.boardTabs}><a href="/customer/notice">공지사항</a><a className={styles.active} href="/customer/qna">질문답변 (1:1)</a></div></div></section>
 <section className={styles.content}><div className="container">{!allowed?<PasswordGate id={id} title={String(meta.title)}/>:<><div style={{borderTop:'2px solid #24364c'}}><div style={{padding:'22px 18px',borderBottom:'1px solid #e2e7ed'}}><h2 style={{margin:'0 0 12px',fontSize:24}}>{post.is_secret?'🔒 ':''}{String(post.title)}</h2><p style={{margin:0,color:'#7a8796',fontSize:14}}>작성자 {String(post.nickname)} · {new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(String(post.created_at)))}</p></div><div style={{padding:'38px 18px',minHeight:220,lineHeight:1.9,whiteSpace:'pre-wrap'}}>{String(post.content)}</div>{post.admin_answer&&<div style={{padding:'25px',background:'#f5f9ff',borderTop:'1px solid #dce6f2'}}><strong style={{color:'#0c63d4'}}>올바른매입 답변</strong><p style={{whiteSpace:'pre-wrap',lineHeight:1.8}}>{String(post.admin_answer)}</p></div>}</div><div style={{marginTop:25,textAlign:'center'}}><a className={styles.writeButton} href="/customer/qna">목록으로</a></div></>}</div></section>
 </main>;
}