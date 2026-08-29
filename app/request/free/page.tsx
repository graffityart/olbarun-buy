import RequestForm from '../RequestForm';
import styles from '../request.module.css';

export default function FreePickupPage(){return <main className={styles.page}>
<header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/request/free">무상수거</a><a href="/#security">데이터파기</a></nav><a href="/request/visit" className="btn btnPrimary smallBtn">빠른 견적 문의</a></div></header>
<section className={styles.hero}><div className="container"><p className="sectionKicker">FREE COLLECTION</p><h1>무상수거 신청서</h1><p>매입가치가 낮거나 처리가 필요한 폐컴퓨터·전산장비·불용자재는 조건 확인 후 무상수거를 신청할 수 있습니다.</p><div className={styles.tabs}><a className={styles.tab} href="/request/pickup">수거신청서</a><a className={styles.tab} href="/request/visit">방문견적 의뢰서</a><a className={`${styles.tab} ${styles.active}`} href="/request/free">무상수거</a></div></div></section>
<section className={styles.content}><div className="container"><RequestForm mode="free" /></div></section>
</main>;
}
