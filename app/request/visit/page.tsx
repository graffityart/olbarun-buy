import RequestForm from '../RequestForm';
import styles from '../request.module.css';

export default function VisitEstimatePage(){return <main className={styles.page}>
<header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/#security">데이터파기</a></nav><a href="/#quote" className="btn btnPrimary smallBtn">빠른 견적 문의</a></div></header>
<section className={styles.hero}><div className="container"><p className="sectionKicker">VISIT ESTIMATE</p><h1>방문견적 의뢰서</h1><p>대량 장비, 품목 확인이 어려운 현장, 반출 조건 확인이 필요한 경우 방문견적을 요청해 주세요.</p><div className={styles.tabs}><a className={styles.tab} href="/request/pickup">수거신청서</a><a className={`${styles.tab} ${styles.active}`} href="/request/visit">방문견적 의뢰서</a></div></div></section>
<section className={styles.content}><div className="container"><RequestForm mode="visit" /></div></section>
</main>