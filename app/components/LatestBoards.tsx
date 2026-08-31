import { unstable_noStore as noStore } from 'next/cache';
import { db } from '../../lib/db';
import styles from './latestBoards.module.css';

type Notice={id:number|string,title:string,created_at:string|Date};
type Qna={id:number|string,title:string,is_secret:boolean,created_at:string|Date};

function dateText(value:string|Date){
 return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'2-digit',month:'2-digit',day:'2-digit'})
  .format(new Date(value)).replace(/\. /g,'.').replace('.','-').replace('.','-').replace(/\.$/,'');
}

export default async function LatestBoards(){
 noStore();
 let notices:Notice[]=[];
 let qnas:Qna[]=[];
 try{
  const sql=db();
  notices=(await sql`SELECT id,title,created_at FROM notices WHERE is_published=TRUE ORDER BY created_at DESC LIMIT 8`) as Notice[];
  qnas=(await sql`SELECT id,title,is_secret,created_at FROM qna_posts ORDER BY created_at DESC LIMIT 8`) as Qna[];
 }catch(error){
  console.error('latest boards load error',error);
 }
 return <section className={styles.section}><div className="container"><div className={styles.grid}>
  <div className={styles.board}><div className={styles.head}><h2>공지사항</h2><a href="/customer/notice" aria-label="공지사항 더보기">＋</a></div>{notices.length?<ul className={styles.list}>{notices.map(n=><li className={styles.item} key={String(n.id)}><a className={styles.title} href={`/customer/notice/${n.id}`}><span>{String(n.title)}</span></a><span className={styles.date}>{dateText(n.created_at)}</span></li>)}</ul>:<div className={styles.empty}>등록된 공지사항이 없습니다.</div>}</div>
  <div className={styles.board}><div className={styles.head}><h2>질문답변 (1:1)</h2><a href="/customer/qna" aria-label="질문답변 더보기">＋</a></div>{qnas.length?<ul className={styles.list}>{qnas.map(q=><li className={styles.item} key={String(q.id)}><a className={styles.title} href={`/customer/qna/${q.id}`}>{q.is_secret&&<span className={styles.lock}>🔒</span>}<span>{String(q.title)}</span></a><span className={styles.date}>{dateText(q.created_at)}</span></li>)}</ul>:<div className={styles.empty}>등록된 문의가 없습니다.</div>}</div>
 </div></div></section>;
}
