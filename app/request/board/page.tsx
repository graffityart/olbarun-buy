import styles from '../../customer/board.module.css';
import { db } from '../../../lib/db';

export const dynamic='force-dynamic';
type Row={id:number;title:string;request_type:string;status:string;created_at:string|Date};
const d=(v:string|Date)=>new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(v));
export default async function PurchaseBoard(){
 let rows:Row[]=[];let loadError=false;
 try{const sql=db();rows=await sql`SELECT id,title,request_type,status,created_at FROM purchase_requests ORDER BY id DESC LIMIT 50` as Row[]}catch(e){console.error('purchase board load error',e);loadError=true}
 return <main className={styles.page}><header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav><a href="/request/visit" className="btn btnPrimary smallBtn">매입 신청</a></div></header>
 <section className={styles.hero}><div className="container"><p className="sectionKicker">PURCHASE REQUEST</p><h1>매입 신청 / 문의하기</h1><p>접수된 매입 신청 현황을 확인할 수 있습니다. 개인정보는 공개하지 않습니다.</p></div></section>
 <section className={styles.content}><div className="container"><div className={styles.boardHead}><div><h2>매입 신청</h2><p>최근 접수 순으로 표시됩니다.</p></div></div><table className={styles.table}><thead><tr><th>번호</th><th className={styles.title}>제목</th><th>접수유형</th><th>작성일</th><th>상태</th></tr></thead><tbody>{loadError?<tr><td colSpan={5} className={styles.empty}>신청 내역을 불러오지 못했습니다.</td></tr>:rows.length===0?<tr><td colSpan={5} className={styles.empty}>등록된 매입 신청이 없습니다.</td></tr>:rows.map(r=><tr key={r.id}><td>{r.id}</td><td className={styles.title}><a href={`/request/board/${r.id}`}>{r.title}</a></td><td>{r.request_type==='visit'?'방문견적':r.request_type==='free'?'무상수거':'수거신청'}</td><td>{d(r.created_at)}</td><td>{r.status==='completed'?'처리완료':'접수완료'}</td></tr>)}</tbody></table><a className={styles.writeButton} href="/request/visit">매입 신청하기</a></div></section></main>
}