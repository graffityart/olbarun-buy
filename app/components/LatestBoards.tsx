import { db } from '../../lib/db';
import styles from './latestBoards.module.css';

type Notice={id:number|string,title:string,created_at:string|Date};
type PurchaseRequest={id:number|string,title:string,status:string,created_at:string|Date};
function date(v:string|Date){const d=new Date(v);if(Number.isNaN(d.getTime()))return '';return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'2-digit',day:'2-digit'}).format(d)}
export default async function LatestBoards(){
 let notices:Notice[]=[];let requests:PurchaseRequest[]=[];
 try{
  const sql=db();
  const noticeRows=await sql`SELECT id,title,created_at FROM notices WHERE is_published=TRUE ORDER BY created_at DESC LIMIT 8`;
  const requestRows=await sql`SELECT id,title,status,created_at FROM purchase_requests ORDER BY id DESC LIMIT 8`;
  notices=noticeRows as Notice[];
  requests=requestRows as PurchaseRequest[];
 }catch(error){console.error('homepage board load error',error)}
 return <section className={styles.section}><div className="container"><div className={styles.grid}>
  <div className={styles.board}><div className={styles.head}><div><small>NOTICE</small><h2>공지사항</h2></div><a href="/customer/notice" aria-label="공지사항 전체보기">＋</a></div>{notices.length?<ul className={styles.list}>{notices.map(n=><li className={styles.item} key={String(n.id)}><a className={styles.title} href={`/customer/notice/${n.id}`}><span>{n.title}</span></a><time className={styles.date}>{date(n.created_at)}</time></li>)}</ul>:<div className={styles.empty}>등록된 공지사항이 없습니다.</div>}<a className={styles.more} href="/customer/notice">공지사항 전체보기 <span>→</span></a></div>
  <div className={styles.board}><div className={styles.head}><div><small>PURCHASE REQUEST</small><h2>매입 신청/ 문의하기</h2></div><a href="/request/visit" aria-label="매입 신청하기">＋</a></div>{requests.length?<ul className={styles.list}>{requests.map(r=><li className={styles.item} key={String(r.id)}><a className={styles.title} href={`/request/board/${r.id}`}><span>{r.title}</span>{r.status==='completed'&&<b className={styles.answered}>처리완료</b>}</a><time className={styles.date}>{date(r.created_at)}</time></li>)}</ul>:<div className={styles.empty}>등록된 매입 신청이 없습니다.</div>}<div className={styles.boardActions}><a className={styles.more} href="/request/board">매입 신청 전체보기 <span>→</span></a><a className={styles.write} href="/request/visit">신청하기</a></div></div>
 </div></div></section>;
}
