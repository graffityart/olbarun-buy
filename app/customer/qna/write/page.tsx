import styles from '../../board.module.css';
import QnaWriteForm from './QnaWriteForm';

export default function QnaWritePage(){return <main className={styles.page}>
<header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/customer/notice">공지사항</a><a href="/customer/qna">질문답변 (1:1)</a><a href="/request">수거신청서</a></nav><a href="/customer/qna" className="btn btnGhost smallBtn">목록으로</a></div></header>
<section className={styles.hero}><div className="container"><p className="sectionKicker">PRIVATE Q&amp;A</p><h1>1:1 문의 작성</h1><p>회원가입 없이 작성할 수 있습니다. 개인정보가 포함된 문의는 비밀글 사용을 권장합니다.</p></div></section>
<section className={styles.content}><div className="container"><QnaWriteForm/></div></section>
</main>}