import styles from './latestBoards.module.css';

export default function LatestBoards(){
 return <section className={styles.section}><div className="container"><div className={styles.grid}>
  <div className={styles.board}><div className={styles.head}><h2>공지사항</h2><a href="/customer/notice" aria-label="공지사항 더보기">＋</a></div><div className={styles.empty}>최신 공지사항은 고객센터에서 확인하실 수 있습니다.<br/><a href="/customer/notice">공지사항 전체보기 →</a></div></div>
  <div className={styles.board}><div className={styles.head}><h2>질문답변 (1:1)</h2><a href="/customer/qna" aria-label="질문답변 더보기">＋</a></div><div className={styles.empty}>매입·수거 관련 문의는 질문답변 게시판을 이용해 주세요.<br/><a href="/customer/qna">질문답변 바로가기 →</a></div></div>
 </div></div></section>;
}
