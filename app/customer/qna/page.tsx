import styles from '../board.module.css';
import { db } from '../../../lib/db';

export const dynamic = 'force-dynamic';

type QnaPost = {
  id: number;
  nickname: string;
  title: string;
  is_secret: boolean;
  status: string;
  created_at: string | Date;
};

function formatDate(value: string | Date) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

export default async function QnaPage(){
  let posts: QnaPost[] = [];
  let loadError = false;
  try {
    const sql = db();
    posts = await sql`SELECT id, nickname, title, is_secret, status, created_at FROM qna_posts ORDER BY id DESC LIMIT 50` as QnaPost[];
  } catch (error) {
    console.error('qna page load error:', error);
    loadError = true;
  }

  return <main className={styles.page}>
<header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/#category">폐컴퓨터 매입</a><a href="/#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav><a href="/request/visit" className="btn btnPrimary smallBtn">빠른 견적 문의</a></div></header>
<section className={styles.hero}><div className="container"><p className="sectionKicker">1:1 Q&amp;A</p><h1>질문답변</h1><p>회원가입 없이 문의할 수 있으며 비밀글로 안전하게 상담할 수 있습니다.</p><div className={styles.boardTabs}><a href="/customer/notice">공지사항</a><a className={styles.active} href="/customer/qna">질문답변 (1:1)</a></div></div></section>
<section className={styles.content}><div className="container"><div className={styles.boardHead}><div><h2>질문답변 (1:1)</h2><p>비밀글은 작성 시 설정한 비밀번호 확인 후 열람할 수 있습니다.</p></div></div><table className={styles.table}><thead><tr><th>번호</th><th className={styles.title}>제목</th><th>작성자</th><th>작성일</th><th>상태</th></tr></thead><tbody>{loadError ? <tr><td colSpan={5} className={styles.empty}>게시글을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</td></tr> : posts.length === 0 ? <tr><td colSpan={5} className={styles.empty}>등록된 문의가 없습니다.</td></tr> : posts.map((post)=><tr key={post.id}><td>{post.id}</td><td className={styles.title}><span className={styles.lock}>{post.is_secret ? '🔒' : ''}</span><a href={`/customer/qna/${post.id}`}>{post.title}</a></td><td>{post.nickname}</td><td>{formatDate(post.created_at)}</td><td>{post.status === 'answered' ? '답변완료' : '답변대기'}</td></tr>)}</tbody></table><a className={styles.writeButton} href="/customer/qna/write">문의 글쓰기</a></div></section>
</main>;}
