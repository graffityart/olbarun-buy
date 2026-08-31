import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '부산진구 폐컴퓨터 매입｜서면·전포·부전 출장매입 | 올바른매입',
  description: '부산진구 폐컴퓨터 출장매입. 서면·전포·부전·양정·가야·개금 등 사무실, PC방, 병원, 학원, 사업장의 폐PC·서버·네트워크·불용 전산장비를 매입합니다. HDD 등 저장장치는 요청 시 천공 파기 상담이 가능합니다.',
  alternates: { canonical: '/buy/busan/busanjin-gu' },
};

const neighborhoods=['서면','부전동','전포동','범천동','양정동','가야동','개금동','당감동','부암동','연지동','초읍동'];
const faq=[
 ['서면 사무실에서 컴퓨터가 20~30대 정도 나오는데 출장매입이 가능한가요?','가능합니다. 본체, 모니터, 노트북, 서버 등 품목과 수량을 먼저 확인한 뒤 방문 일정과 매입 방식을 협의합니다.'],
 ['PC방에서 사용하던 본체와 모니터도 한 번에 견적할 수 있나요?','가능합니다. CPU, GPU, 메모리, 저장장치와 모니터 크기·상태 등을 확인해 일괄 견적할 수 있습니다.'],
 ['회사 HDD에 개인정보가 있는데 어떻게 처리하나요?','요청 시 저장장치를 분리해 전용 천공 방식으로 물리적 파기 상담이 가능합니다. 중요한 자료가 남은 장비는 수거 전 처리 방식을 협의하는 것을 권장합니다.'],
 ['서버와 네트워크 스위치도 매입하나요?','랙서버, 워크스테이션, 스위치, 라우터, UPS 등 기업 전산장비도 함께 상담할 수 있습니다.'],
 ['소량도 부산진구 출장매입이 가능한가요?','품목과 위치, 수량에 따라 택배매입 또는 출장매입 중 적합한 방법을 안내합니다.'],
];

export default function BusanjinBuyPage(){
 const jsonLd={
  '@context':'https://schema.org','@graph':[
   {'@type':'Service',name:'부산진구 폐컴퓨터 출장매입',areaServed:{'@type':'AdministrativeArea',name:'부산광역시 부산진구'},provider:{'@type':'LocalBusiness',name:'올바른매입'},serviceType:['폐컴퓨터 매입','서버 매입','네트워크 장비 매입','불용 전산장비 매입','HDD 천공 파기 상담']},
   {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:'/'},{'@type':'ListItem',position:2,name:'부산 폐컴퓨터 매입',item:'/buy/busan'},{'@type':'ListItem',position:3,name:'부산진구 폐컴퓨터 매입',item:'/buy/busan/busanjin-gu'}]},
   {'@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
  ]
 };
 return <main>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
  <header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/">폐컴퓨터 매입</a><a href="/buy/busan">부산/경남 지역 출장매입</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav><a className="btn btnPrimary smallBtn" href="/request/visit">출장 견적문의</a></div></header>

  <section className="hero"><div className="container" style={{padding:'72px 0 42px'}}><p className="sectionKicker">BUSANJIN-GU ON-SITE BUYING</p><h1 style={{fontSize:52,margin:'8px 0 18px'}}>부산진구 폐컴퓨터 매입</h1><p className="heroDesc">서면·전포·부전·양정 등 부산진구 전 지역에서 사무실, PC방, 병원, 학원, 상가와 사업장의 폐컴퓨터·서버·네트워크 장비·불용 전산자재를 출장매입합니다.</p><div className="heroActions"><a href="/request/visit" className="btn btnPrimary">출장매입 견적문의</a><a href="/request/pickup" className="btn btnGhost">수거 신청하기</a></div><p className="trustLine">부산진구 출장 상담 · 대량 장비 일괄견적 · HDD 천공 파기 상담</p></div></section>

  <section className="section" style={{paddingTop:36}}><div className="container"><div style={{minHeight:360,borderRadius:20,overflow:'hidden',backgroundImage:"linear-gradient(90deg,rgba(6,26,51,.80),rgba(6,26,51,.22)),url('/images/buy/busan/busanjin-gu-hero.webp')",backgroundSize:'cover',backgroundPosition:'center',display:'flex',alignItems:'end',padding:36,color:'#fff',backgroundColor:'#12345b'}}><div><p style={{margin:'0 0 8px',fontWeight:800,color:'#9bc6ff'}}>IMAGE READY</p><h2 style={{fontSize:32,margin:'0 0 10px'}}>부산진구 전 지역 출장매입</h2><p style={{margin:0,lineHeight:1.7,maxWidth:680}}>이미지 파일 <b>busanjin-gu-hero.webp</b>를 /public/images/buy/busan/ 폴더에 업로드하면 이 영역에 바로 표시됩니다.</p></div></div></div></section>

  <section className="section" style={{paddingTop:18}}><div className="container"><div className="sectionHead"><div><p className="sectionKicker">LOCAL COVERAGE</p><h2>서면을 중심으로 부산진구 전역을 방문합니다</h2></div><p>사업장 위치와 장비 수량에 맞춰 방문 견적과 수거 일정을 협의합니다.</p></div><div style={{display:'flex',flexWrap:'wrap',gap:10}}>{neighborhoods.map(n=><span key={n} style={{padding:'10px 14px',border:'1px solid #d7e2ee',borderRadius:999,background:'#f8fbff',fontWeight:700,color:'#27415f'}}>{n}</span>)}</div></div></section>

  <section className="section" style={{background:'#f7f9fc'}}><div className="container"><div className="sectionHead"><div><p className="sectionKicker">BUSANJIN-GU BUYING</p><h2>부산진구에서 자주 발생하는 폐컴퓨터 매입 유형</h2></div></div><div className="processDetailGrid"><div><strong>서면·부전 사무실 장비 교체</strong><p>사무실 이전이나 PC 교체 시 발생하는 데스크탑, 모니터, 노트북, 주변기기를 함께 확인해 일괄 견적합니다.</p></div><div><strong>전포·서면 상가·병원·학원</strong><p>카운터 PC, 업무용 컴퓨터, 노트북, NAS, 네트워크 장비처럼 업종별로 섞여 나오는 장비도 품목별로 분류해 상담합니다.</p></div><div><strong>PC방·게임 장비 교체</strong><p>게이밍 본체, 그래픽카드, 고주사율 모니터 등은 일반 사무용 장비와 분리해 사양과 상태를 확인합니다.</p></div><div><strong>기업 불용 전산장비</strong><p>랙서버, 워크스테이션, 스위치, 라우터, UPS와 통신자재까지 한 번에 정리할 수 있습니다.</p></div></div></div></section>

  <section className="section"><div className="container"><div className="sectionHead"><div><p className="sectionKicker">BUYING ITEMS</p><h2>폐PC부터 서버·통신장비까지 함께 견적</h2></div></div><div className="threeGrid"><article className="categoryCard category1"><h2>폐컴퓨터·모니터</h2><ul><li>사무용 데스크탑</li><li>노트북·일체형 PC</li><li>LCD 모니터</li><li>PC방 장비</li></ul></article><article className="categoryCard category2"><h2>서버·네트워크</h2><ul><li>랙서버·워크스테이션</li><li>스위치·라우터</li><li>NAS·UPS</li><li>기업 전산장비</li></ul></article><article className="categoryCard category3"><h2>통신스크랩·불용자재</h2><ul><li>메인보드·보드류</li><li>통신장비</li><li>케이블·전산자재</li><li>사업장 불용품</li></ul></article></div></div></section>

  <section className="securitySection"><div className="container securityGrid"><div><p className="sectionKicker light">DATA SECURITY</p><h2>매입보다 먼저 확인해야 할<br/><span>중요 데이터의 안전한 처리</span></h2><p>기업과 병원, 학원, 사무실에서 사용하던 폐컴퓨터에는 고객정보·거래자료·내부문서가 남아 있을 수 있습니다. 요청 시 HDD 등 저장장치를 분리하고 전용 천공 장비로 물리적으로 파기하는 방법을 상담합니다.</p><a href="/request/visit" className="btn btnGreen">HDD 파기 포함 견적문의</a></div><div className="securitySteps"><div className="securityStep"><span>01</span><div className="driveIcon">HDD</div><strong>저장장치 확인</strong></div><div className="stepArrow">→</div><div className="securityStep"><span>02</span><div className="drillIcon">●</div><strong>천공 처리</strong></div><div className="stepArrow">→</div><div className="securityStep"><span>03</span><div className="driveIcon broken">×</div><strong>폐기·처리</strong></div></div></div></section>

  <section className="section"><div className="container"><div style={{minHeight:320,borderRadius:18,overflow:'hidden',backgroundImage:"linear-gradient(0deg,rgba(7,29,58,.72),rgba(7,29,58,.10)),url('/images/buy/busan/busanjin-gu-content.webp')",backgroundSize:'cover',backgroundPosition:'center',display:'flex',alignItems:'end',padding:32,color:'#fff',backgroundColor:'#34506f'}}><div><h2 style={{margin:'0 0 8px',fontSize:28}}>현장 수거·전산장비 작업 이미지 영역</h2><p style={{margin:0,lineHeight:1.7}}>파일명 <b>busanjin-gu-content.webp</b>를 같은 부산 이미지 폴더에 올리면 자동으로 표시됩니다.</p></div></div></div></section>

  <section className="section" style={{background:'#f7fbff'}}><div className="container"><div className="centerHead"><p className="sectionKicker">PROCESS</p><h2>부산진구 출장매입 진행 순서</h2></div><div className="processTrust"><div><b>1</b><strong>견적문의</strong><span>품목·수량·사진 전달</span></div><div><b>2</b><strong>사전견적</strong><span>장비 기준 확인</span></div><div><b>3</b><strong>방문일정</strong><span>날짜·장소 협의</span></div><div><b>4</b><strong>수거·결제</strong><span>현장 확인 후 처리</span></div></div></div></section>

  <section className="section"><div className="container"><div className="sectionHead"><div><p className="sectionKicker">FAQ</p><h2>부산진구 폐컴퓨터 매입 자주 묻는 질문</h2></div></div><div style={{display:'grid',gap:14}}>{faq.map(([q,a])=><details key={q} style={{border:'1px solid #dce6f0',borderRadius:12,padding:'18px 20px',background:'#fff'}}><summary style={{fontWeight:800,cursor:'pointer'}}>{q}</summary><p style={{color:'#62758d',lineHeight:1.8,margin:'14px 0 0'}}>{a}</p></details>)}</div></div></section>

  <section className="section" style={{paddingTop:20}}><div className="container"><div className="sectionHead"><div><p className="sectionKicker">NEARBY AREA</p><h2>부산 인접 지역 출장매입</h2></div></div><div style={{display:'flex',flexWrap:'wrap',gap:12}}><a className="btn btnGhost" href="/buy/busan/dong-gu">동구 폐컴퓨터 매입</a><a className="btn btnGhost" href="/buy/busan/dongnae-gu">동래구 폐컴퓨터 매입</a><a className="btn btnGhost" href="/buy/busan/yeonje-gu">연제구 폐컴퓨터 매입</a><a className="btn btnGhost" href="/buy/busan/nam-gu">남구 폐컴퓨터 매입</a><a className="btn btnGhost" href="/buy/busan">부산 전체지역 보기</a></div></div></section>

  <section className="darkCta"><div className="container ctaWrap"><div><h2>부산진구 폐컴퓨터 출장매입이 필요하신가요?</h2><p>장비 사진과 수량을 알려주시면 현장 상황에 맞는 매입 방법을 안내해드립니다.</p></div><div className="heroActions"><a href="/request/visit" className="btn btnYellow">방문견적 의뢰서</a><a href="/request/pickup" className="btn btnGhost">수거신청서</a></div></div></section>
 </main>;
}
