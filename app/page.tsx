import LatestBoards from './components/LatestBoards';

export const dynamic='force-dynamic';

const buyItems=[
  {icon:'PC',title:'폐컴퓨터 · 중고컴퓨터',desc:'데스크탑, 노트북, 모니터, 일체형 PC, PC방 및 사무용 컴퓨터',tags:['컴퓨터 매입','폐컴퓨터 수거','대량 매입']},
  {icon:'SV',title:'서버 · 전산장비',desc:'랙서버, 워크스테이션, 스토리지, UPS 등 기업 전산장비',tags:['서버 매입','전산장비 매입','불용자산']},
  {icon:'NW',title:'네트워크 · 통신장비',desc:'스위치, 라우터, 통신장비, 보드류, 케이블 및 관련 자재',tags:['네트워크 장비','통신장비','통신스크랩']},
  {icon:'HD',title:'HDD · SSD 데이터 파기',desc:'매입 장비에 남은 중요 데이터는 요청 시 삭제 또는 물리적 천공 파기',tags:['HDD 파기','SSD 처리','보안 폐기']}
];

const customers=[
  ['기업 · 사무실','PC 교체, 이전, 폐업 시 발생하는 다량의 전산장비를 한 번에 상담합니다.'],
  ['관공서 · 학교 · 기관','불용 컴퓨터와 전산장비의 품목·수량을 확인해 수거 방식을 안내합니다.'],
  ['PC방 · 사업장','데스크탑, 모니터, 부품 등 여러 품목을 묶어 일괄 매입 상담이 가능합니다.'],
  ['개인 · 소량','컴퓨터 한두 대와 부품도 택배 또는 상황에 맞는 방법으로 매입합니다.']
];

const process=[
  ['01','간편 견적 접수','품목·수량·사진을 보내주세요.'],
  ['02','매입 조건 확인','모델과 상태, 수량을 기준으로 확인합니다.'],
  ['03','방문·택배 수거','대량은 출장, 소량은 택배 등으로 진행합니다.'],
  ['04','검수 및 정산','현장 또는 입고 검수 후 매입을 마무리합니다.']
];

export default function Home(){return <main className="homeV2">
  <header className="siteHeader"><div className="container navWrap">
    <a href="#top" className="brand"><span className="brandMark">O</span><span>올바른<span className="brandBlue">매입</span></span></a>
    <nav className="desktopNav"><a href="#items">매입품목</a><a href="#business">기업·대량매입</a><a href="#security">데이터파기</a><a href="#process">매입절차</a><a href="/customer/notice">고객센터</a></nav>
    <a href="/request/visit" className="btn btnPrimary smallBtn">무료 견적 신청</a>
  </div></header>

  <section id="top" className="newHero"><div className="container newHeroGrid">
    <div className="heroCopy"><p className="heroLabel">전국 컴퓨터 · 서버 · 전산장비 전문 매입</p>
      <h1>버리는 전산장비가 아니라<br/><em>가치를 다시 매입합니다.</em></h1>
      <p className="newHeroDesc">폐컴퓨터와 중고컴퓨터부터 서버·네트워크 장비·기업 불용 IT자산까지. 품목과 수량에 맞춰 전국에서 상담하고, 대량 물량은 출장 수거까지 진행합니다.</p>
      <div className="heroQuick"><a href="/request/visit" className="btn heroMainBtn">사진으로 빠른 견적 받기 <b>→</b></a><a href="/request/pickup" className="btn heroSubBtn">수거 신청하기</a></div>
      <div className="heroPoints"><span>✓ 전국 매입 상담</span><span>✓ 기업 대량 수거</span><span>✓ HDD·SSD 보안 처리</span></div>
    </div>
    <div className="heroPanel"><div className="heroPanelTop"><span>OLBARUN BUY</span><b>IT ASSET BUYING</b></div><div className="deviceStage"><div className="device server">SERVER</div><div className="device pc">PC</div><div className="device monitor2">IT</div></div><div className="heroPanelBottom"><strong>컴퓨터 한 대부터<br/>기업 전산실 전체까지</strong><a href="#items">매입 품목 보기 ↓</a></div></div>
  </div></section>

  <section className="quickStrip"><div className="container quickStripGrid"><div><b>01</b><span>폐·중고 컴퓨터</span></div><div><b>02</b><span>서버·전산장비</span></div><div><b>03</b><span>네트워크·통신장비</span></div><div><b>04</b><span>데이터 파기</span></div></div></section>

  <section id="items" className="section v2Section"><div className="container"><div className="v2Head"><p>WHAT WE BUY</p><h2>어떤 장비를 매입하나요?</h2><span>단순 폐기보다 먼저 매입 가능 여부를 확인하세요. 여러 종류의 장비가 섞여 있어도 한 번에 상담할 수 있습니다.</span></div><div className="buyItemGrid">{buyItems.map((x,i)=><article className="buyItem" key={x.title}><div className="buyItemNo">0{i+1}</div><div className="buyIcon">{x.icon}</div><h3>{x.title}</h3><p>{x.desc}</p><div className="tagRow">{x.tags.map(t=><span key={t}>{t}</span>)}</div><a href="/request/visit">이 품목 견적 문의 <b>↗</b></a></article>)}</div></div></section>

  <section id="business" className="businessSection"><div className="container businessGrid"><div className="businessIntro"><p>BUSINESS & BULK</p><h2>기업의 불용 IT자산,<br/><em>수거부터 데이터 보안까지</em></h2><p>사무실 이전, 장비 교체, 폐업 등으로 한꺼번에 발생한 컴퓨터와 서버를 품목별로 따로 처리할 필요가 없습니다. 현장 상황과 수량을 확인해 적합한 매입·수거 방식을 안내합니다.</p><a href="/request/visit" className="btn btnLight">대량 방문견적 요청 →</a></div><div className="customerCards">{customers.map(([t,d],i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

  <section id="security" className="section securityV2"><div className="container"><div className="v2Head"><p>DATA SECURITY</p><h2>장비보다 중요한 것은<br/>그 안에 남아 있는 데이터입니다.</h2><span>기업 자료와 개인정보가 저장된 HDD·SSD는 요청에 따라 데이터 삭제 또는 물리적 파기 방식으로 처리합니다.</span></div><div className="securityFlow"><article><b>01</b><div className="hddVisual">HDD</div><h3>저장장치 확인</h3><p>수거 장비에서 저장장치를 분류하고 처리 대상을 확인합니다.</p></article><i>→</i><article><b>02</b><div className="hddVisual punched">●</div><h3>데이터 삭제·천공</h3><p>요청 조건에 따라 삭제 또는 물리적 천공 방식으로 처리합니다.</p></article><i>→</i><article><b>03</b><div className="hddVisual destroyed">×</div><h3>파기 완료·처리</h3><p>재사용이 필요한 장비와 파기 대상을 구분해 후속 절차를 진행합니다.</p></article></div></div></section>

  <section id="process" className="section processV2"><div className="container"><div className="v2Head center"><p>4 STEP PROCESS</p><h2>복잡하지 않게, 빠르게 매입합니다.</h2><span>사진과 기본 정보만 준비하면 상담을 시작할 수 있습니다.</span></div><div className="processV2Grid">{process.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div><div className="processButtons"><a href="/request/visit" className="btn btnPrimary">방문 견적 의뢰</a><a href="/request/pickup" className="btn btnGhost">수거 신청서 작성</a><a href="/request/free" className="btn btnGhost">무상수거 문의</a></div></div></section>

  <section className="seoContent"><div className="container seoGrid"><div><p className="sectionKicker">OLBARUN BUY</p><h2>폐컴퓨터 매입부터 서버·전산장비 전국매입까지</h2></div><div><p>올바른매입은 사용하지 않는 <strong>폐컴퓨터·중고컴퓨터 매입</strong>과 기업의 <strong>서버·전산장비 매입</strong>을 함께 진행합니다. 데스크탑, 노트북, 모니터뿐 아니라 서버, 워크스테이션, 네트워크 장비와 각종 불용 IT자산까지 상담할 수 있습니다.</p><p>특히 기업·관공서·학교·병원·사무실처럼 수량이 많은 현장은 장비 종류와 수량, 작업 환경을 확인해 출장 수거 방식을 안내하며, 저장장치 보안이 필요한 경우 HDD·SSD 데이터 처리도 함께 상담할 수 있습니다.</p></div></div></section>

  <section className="finalCta"><div className="container finalCtaInner"><div><span>지금 처분할 장비가 있으신가요?</span><h2>사진 몇 장으로<br/>매입 상담을 시작하세요.</h2></div><div><a href="/request/visit" className="btn btnWhite">빠른 견적 신청 →</a><a href="/process" className="finalTextLink">매입 절차 먼저 보기</a></div></div></section>

  <LatestBoards/>
  <footer className="footer"><div className="container footerGrid"><div className="brand footerBrand"><span className="brandMark">O</span><span>올바른매입</span></div><div><strong>매입 서비스</strong><p>폐컴퓨터 · 중고컴퓨터<br/>서버 · 전산장비<br/>네트워크 · 통신장비</p></div><div><strong>신청·문의</strong><p><a href="/request/pickup">수거신청서</a><br/><a href="/request/visit">방문견적 의뢰서</a><br/><a href="/customer/qna">1:1 문의</a></p></div><div><strong>데이터 보안</strong><p>HDD · SSD 데이터 삭제 및 물리적 파기 상담</p></div></div></footer>

  <div className="mobileBottom"><a href="/request/pickup"><b>⌂</b><span>수거신청</span></a><a href="/request/visit" className="primary"><b>＋</b><span>빠른견적</span></a><a href="/customer/qna"><b>Q</b><span>1:1문의</span></a></div>
</main>}
