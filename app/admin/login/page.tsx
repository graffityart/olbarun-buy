import AdminLoginForm from './AdminLoginForm';

type Props={searchParams:Promise<{next?:string}>};
export default async function AdminLoginPage({searchParams}:Props){const params=await searchParams;const nextPath=params.next&&params.next.startsWith('/')?params.next:'/customer/qna';return <main><header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a></div></header><section className="section"><div className="container"><AdminLoginForm nextPath={nextPath}/></div></section></main>}
