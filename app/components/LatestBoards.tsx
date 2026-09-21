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
  <div className={styles.board}><div className={styles.head}><div><small>PURCHASE REQUEST</small><h2>매입 신청/ 문의하기</h2></div><a href="/request/visit" aria-label="매입 신청하기">＋</a></div><div className={styles.purchaseIntro}><strong>폐컴퓨터·전산장비 매입 신청</strong><p>품목과 수량, 사진 등 기본 정보를 남겨주시면 확인 후 매입 상담을 안내해드립니다.</p></div><div className={styles.boardActions}><a className={styles.more} href="/request/visit">매입 신청 안내 <span>→</span></a><a className={styles.write} href="/request/visit">신청하기</a></div></div>
 </div></div></section>;
}
