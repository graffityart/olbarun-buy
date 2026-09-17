import { db } from '../../lib/db';
import styles from './latestBoards.module.css';

type Notice={id:number|string,title:string,created_at:string|Date};
type Qna={id:number|string,title:string,nickname:string,is_secret:boolean,status:string,created_at:string|Date};
function date(v:string|Date){const d=new Date(v);if(Number.isNaN(d.getTime()))return '';return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'2-digit',day:'2-digit'}).format(d)}
export default async function LatestBoards(){
 let notices:Notice[]=[];let qnas:Qna[]=[];
 try{
  const sql=db();
  const noticeRows=await sql`SELECT id,title,created_at FROM notices WHERE is_published=TRUE ORDER BY created_at DESC LIMIT 8`;
  const qnaRows=await sql`SELECT id,title,nickname,is_secret,status,created_at FROM qna_posts ORDER BY id DESC LIMIT 8`;
  notices=noticeRows as Notice[];
  qnas=qnaRows as Qna[];
 }catch(error){console.error('homepage board load error',error)}
 return <section className={styles.section}><div className="container"><div className={styles.grid}>
  <div className={styles.board}><div className={styles.head}><div><small>NOTICE</small><h2>공지사항</h2></div><a href="/customer/notice" aria-label="공지사항 전체보기">＋</a></div>{notices.length?<ul className={styles.list}>{notices.map(n=><li className={styles.item} key={String(n.id)}><a className={styles.title} href={`/customer/notice/${n.id}`}><span>{n.title}</span></a><time className={styles.date}>{date(n.created_at)}</time></li>)}</ul>:<div className={styles.empty}>등록된 공지사항이 없습니다.</div>}<a className={styles.more} href="/customer/notice">공지사항 전체보기 <span>→</span></a></div>
  <div className={styles.board}><div className={styles.head}><div><small>1:1 Q&amp;A</small><h2>질문답변 <em>(1:1)</em></h2></div><a href="/customer/qna" aria-label="질문답변 전체보기">＋</a></div>{qnas.length?<ul className={styles.list}>{qnas.map(q=><li className={styles.item} key={String(q.id)}><a className={styles.title} href={`/customer/qna/${q.id}`}><span className={styles.lock}>{q.is_secret?'🔒':''}</span><span>{q.title}</span>{q.status==='answered'&&<b className={styles.answered}>답변완료</b>}</a><time className={styles.date}>{date(q.created_at)}</time></li>)}</ul>:<div className={styles.empty}>등록된 문의가 없습니다.</div>}<div className={styles.boardActions}><a className={styles.more} href="/customer/qna">질문답변 전체보기 <span>→</span></a><a className={styles.write} href="/customer/qna/write">문의하기</a></div></div>
 </div></div></section>;
}
