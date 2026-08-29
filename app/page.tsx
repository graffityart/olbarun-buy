const categories = [
  { title: '폐 컴퓨터 (전체)', desc: ['데스크탑 · 본체 · 모니터', '노트북 · 일체형 PC', '사무용 PC · PC방 장비', '기업 불용 전산장비'], cta: '폐컴퓨터 매입 알아보기' },
  { title: '서버 / 네트워크 장비', desc: ['서버 · 랙서버', '워크스테이션', '스위치 · 라우터', 'UPS 및 관련 장비'], cta: '서버장비 매입 알아보기' },
  { title: '통신스크랩 / 불용자재', desc: ['통신장비', '전자부품 · 보드류', '케이블 및 통신자재', '기업 불용 전산자재'], cta: '통신스크랩 매입 알아보기' },
];

const priceRows = [
  ['사무용 데스크탑', '사양 확인', '견적'],
  ['게이밍 PC', 'CPU / GPU 기준', '견적'],
  ['노트북', '모델 · 상태 기준', '견적'],
  ['LCD 모니터', '크기 · 상태 기준', '견적'],
  ['메인보드', '등급 · 수량 기준', '견적'],
];

const methods = [
  { no:'01', title:'출장매입', note:'수량이 많은 경우 출장 방문하여 매입', steps:['견적문의','견적제공','계약 및 날짜협의','방문수거','결제'] },
  { no:'02', title:'현장방문매입', note:'대량 물품 확인이 어려운 경우 진행 · 출장비 무료', steps:['견적문의','날짜협의','현장방문','견적제공','계약 및 날짜협의','방문수거','결제'] },
  { no:'03', title:'택배매입', note:'소량의 경우 택배로 간편하게 매입', steps:['견적문의','견적제공','택배 발송','물품확인','결제'] },
  { no:'04', title:'직접방문', note:'소량·대량 물품을 직접 방문하여 진행 · 현장에서 결제', steps:['견적문의','직접방문','물품확인','결제'] },
];

const stepIcons = ['✎','▤','▣','⌂','▱','▦','▢'];

export default function Home() {
  return <main>
    <header className="siteHeader"><div className="container navWrap">
      <a href="#top" className="brand" aria-label="올바른매입 홈"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a>
      <nav className="desktopNav" aria-label="주요 메뉴">
        <a href="#category">폐컴퓨터 매입</a><a href="#category">서버·네트워크</a><a href="#category">통신스크랩</a><a href="#price">매입단가</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="#security">데이터파기</a>
      </nav>
      <a href="/request" className="btn btnPrimary smallBtn">빠른 견적 문의</a>
    </div></header>

    <section id="top" className="hero"><div className="container heroGrid">
      <div className="heroCopy"><p className="eyebrow">폐컴퓨터 매입 전문업체</p><h1>올바른<span>매입</span></h1><p className="heroDesc">사용하지 않는 컴퓨터부터 서버·네트워크 장비, 통신장비와 각종 불용자재까지 수량과 품목에 맞춰 합리적인 가격으로 매입합니다.</p><div className="heroBadge">폐컴퓨터 최고가 매입</div><p className="heroMeta">택배 매입 · 출장 매입 · 대량 수거 가능</p><div className="heroActions"><a href="/request/visit" className="btn btnPrimary">매입 견적 문의</a><a href="#price" className="btn btnGhost">매입 단가 확인</a></div><p className="trustLine">기업 · 사무실 · PC방 · 학교 · 기관 · 개인 매입 상담</p></div>
      <div className="heroVisual" aria-label="폐컴퓨터와 서버 장비 일러스트"><div className="serverRack rackA"/><div className="serverRack rackB"/><div className="monitor"><div className="monitorScreen"/></div><div className="desktopTower"/><div className="laptop"><div className="laptopScreen"/></div><div className="visualGlow"/></div>
    </div></section>

    <section id="category" className="section categorySection"><div className="container threeGrid">{categories.map((item,index)=><article className={`categoryCard category${index+1}`} key={item.title}><div className="categoryIcon">{index===0?'PC':index===1?'SV':'IT'}</div><h2>{item.title}</h2><ul>{item.desc.map(line=><li key={line}>{line}</li>)}</ul><a href="/request/visit" className="textLink">{item.cta} →</a></article>)}</div></section>

    <section id="security" className="securitySection"><div className="container securityGrid">
      <div><p className="sectionKicker light">DATA SECURITY</p><h2>컴퓨터는 매입하고<br/>중요한 데이터는 <span>확실하게 파기합니다.</span></h2><p>폐컴퓨터를 처분할 때 가장 걱정되는 것은 저장장치에 남은 개인정보와 기업 중요 자료입니다. 요청 시 HDD 등 저장장치를 전용 천공 장비로 물리적으로 파손해 재사용이 어렵도록 처리합니다.</p><a href="/request/visit" className="btn btnGreen">데이터 파기 포함 견적 문의</a></div>
      <div className="securitySteps"><div className="securityStep"><span>01</span><div className="driveIcon">HDD</div><strong>저장장치 확인</strong><p>HDD 및 데이터 저장장치 확인</p></div><div className="stepArrow">→</div><div className="securityStep featured"><span>02</span><div className="drillIcon">●</div><strong>천공 처리</strong><p>전용 천공기를 이용한 물리적 파손</p></div><div className="stepArrow">→</div><div className="securityStep"><span>03</span><div className="driveIcon broken">×</div><strong>폐기·처리</strong><p>파손 저장장치 분류 및 처리</p></div></div>
    </div></section>

    <section id="price" className="section"><div className="container"><div className="sectionHead"><div><p className="sectionKicker">BUYING PRICE</p><h2>오늘의 매입 단가</h2></div><p>품목과 사양, 수량, 상태에 따라 실제 매입가격은 달라질 수 있습니다.</p></div><div className="priceTabs"><button className="active">폐 컴퓨터</button><button>서버 / 네트워크 장비</button><button>통신스크랩 / 불용자재</button></div><div className="priceGrid"><div className="tableWrap"><table><thead><tr><th>매입 품목</th><th>기준</th><th>매입가</th></tr></thead><tbody>{priceRows.map(row=><tr key={row[0]}>{row.map((cell,i)=><td key={cell} className={i===2?'priceCell':''}>{cell}</td>)}</tr>)}</tbody></table></div><aside className="priceAside"><div className="moneyIcon">₩</div><strong>수량이 많을수록<br/>개별 견적을 추천합니다.</strong><a href="/request/visit" className="btn btnPrimary">견적 의뢰하기</a></aside></div></div></section>

    <section id="process" className="section processSection"><div className="container"><div className="centerHead"><p className="sectionKicker">PROCESS</p><h2>올바른매입 절차 안내</h2></div><div className="processRows">{methods.map(m=><article className="processRow" key={m.no}><div className="processIntro"><strong className="processNo">{m.no}<i>.</i></strong><div><h2>{m.title}</h2><p>{m.note}</p></div></div><div className="horizontalSteps">{m.steps.map((step,i)=><div className="horizontalStepWrap" key={step+i}><div className="horizontalStep"><span>{stepIcons[i%stepIcons.length]}</span><strong>{step}</strong></div>{i<m.steps.length-1&&<b className="horizontalArrow">›</b>}</div>)}</div></article>)}</div><div style={{textAlign:'center',marginTop:30}}><a href="/process" className="btn btnGhost">매입 절차 자세히 보기</a></div></div></section>

    <section className="darkCta"><div className="container ctaWrap"><div><h2>수거 신청 또는 방문견적이 필요하신가요?</h2><p>품목과 수량을 알려주시면 현장 상황에 맞는 방식으로 안내해드립니다.</p></div><div className="heroActions"><a href="/request/pickup" className="btn btnYellow">수거신청서</a><a href="/request/visit" className="btn btnGhost">방문견적 의뢰서</a></div></div></section>

    <section className="section benefitsSection"><div className="container splitBenefits"><div><p className="sectionKicker">BULK BUYING</p><h2>한두 대부터 대량 전산장비까지</h2><p className="muted">PC 한 대부터 사무실 이전·폐업·장비 교체 과정에서 발생하는 대량 장비까지 상담할 수 있습니다.</p><div className="miniCards"><div><strong>기업</strong><span>사무실 PC 및 서버 교체</span></div><div><strong>PC방</strong><span>PC·모니터 대량매입</span></div><div><strong>학교·기관</strong><span>불용 전산장비 수거 상담</span></div><div><strong>사업장</strong><span>폐업·이전 장비 일괄 처리</span></div></div></div><div><p className="sectionKicker">WHY OLBARUN</p><h2>올바른매입을 선택하는 이유</h2><div className="reasonGrid"><div><strong>합리적인 매입가격</strong><span>품목·사양·상태 기반 견적</span></div><div><strong>전국 택배매입</strong><span>지역과 관계없이 상담 가능</span></div><div><strong>출장 대량매입</strong><span>기업·사업장 대량 물량 대응</span></div><div><strong>HDD 물리적 파기</strong><span>중요 저장장치 천공 처리</span></div></div></div></div></section>

    <section id="quote" className="quoteSection"><div className="container quoteGrid"><div><p className="sectionKicker light">QUICK REQUEST</p><h2>폐컴퓨터, 얼마나 받을 수 있을까요?</h2><p>모델명이나 사양을 몰라도 괜찮습니다. 수거신청서 또는 방문견적 의뢰서에서 품목과 대략적인 수량을 남겨주세요.</p></div><div className="quoteForm" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}><a href="/request/pickup" className="btn btnPrimary">수거신청서 작성</a><a href="/request/visit" className="btn btnGhost">방문견적 의뢰서 작성</a></div></div></section>

    <footer className="footer"><div className="container footerGrid"><div className="brand footerBrand"><span className="brandMark">↻</span><span>올바른매입</span></div><div><strong>매입안내</strong><p>출장 · 현장방문 · 택배 · 직접방문</p></div><div><strong>신청서</strong><p><a href="/request/pickup">수거신청서</a><br/><a href="/request/visit">방문견적 의뢰서</a></p></div><div><strong>데이터 보안</strong><p>저장장치 물리적 천공 파기 상담</p></div></div></footer>
  </main>;
}
