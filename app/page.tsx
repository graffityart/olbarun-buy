const categories = [
  {
    title: '폐 컴퓨터 (전체)',
    desc: ['데스크탑 · 본체 · 모니터', '노트북 · 일체형 PC', '사무용 PC · PC방 장비', '기업 불용 전산장비'],
    cta: '폐컴퓨터 매입 알아보기',
  },
  {
    title: '서버 / 네트워크 장비',
    desc: ['서버 · 랙서버', '워크스테이션', '스위치 · 라우터', 'UPS 및 관련 장비'],
    cta: '서버장비 매입 알아보기',
  },
  {
    title: '통신스크랩 / 불용자재',
    desc: ['통신장비', '전자부품 · 보드류', '케이블 및 통신자재', '기업 불용 전산자재'],
    cta: '통신스크랩 매입 알아보기',
  },
];

const priceRows = [
  ['사무용 데스크탑', '사양 확인', '견적'],
  ['게이밍 PC', 'CPU / GPU 기준', '견적'],
  ['노트북', '모델 · 상태 기준', '견적'],
  ['LCD 모니터', '크기 · 상태 기준', '견적'],
  ['메인보드', '등급 · 수량 기준', '견적'],
];

const flows = [
  {
    title: '택배 매입',
    steps: ['매입 품목 확인', '견적 문의', '예상 매입가 확인', '택배 발송 [선불]', '상품 확인', '입금 처리'],
    button: '택배 매입 신청',
  },
  {
    title: '출장 매입',
    steps: ['출장 견적 문의', '방문 견적서 작성', '견적 확인', '방문 일자·장소 확인', '장비 수거', '입금 완료'],
    button: '출장 매입 신청',
  },
  {
    title: '무상 수거',
    steps: ['수거 신청서 작성', '품목·수량 확인', '날짜·위치 확인', '수거 완료'],
    button: '무상 수거 문의',
  },
];

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <div className="container navWrap">
          <a href="#top" className="brand" aria-label="올바른매입 홈">
            <span className="brandMark">↻</span>
            <span>올바른<span className="brandBlue">매입</span></span>
          </a>
          <nav className="desktopNav" aria-label="주요 메뉴">
            <a href="#category">폐컴퓨터 매입</a>
            <a href="#category">서버·네트워크</a>
            <a href="#category">통신스크랩</a>
            <a href="#price">매입단가</a>
            <a href="#process">매입방법</a>
            <a href="#security">데이터파기</a>
          </nav>
          <a href="#quote" className="btn btnPrimary smallBtn">빠른 견적 문의</a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">폐컴퓨터 매입 전문업체</p>
            <h1>올바른<span>매입</span></h1>
            <p className="heroDesc">
              사용하지 않는 컴퓨터부터 서버·네트워크 장비, 통신장비와 각종 불용자재까지
              수량과 품목에 맞춰 합리적인 가격으로 매입합니다.
            </p>
            <div className="heroBadge">폐컴퓨터 최고가 매입</div>
            <p className="heroMeta">택배 매입 · 출장 매입 · 대량 수거 가능</p>
            <div className="heroActions">
              <a href="#quote" className="btn btnPrimary">매입 견적 문의</a>
              <a href="#price" className="btn btnGhost">매입 단가 확인</a>
            </div>
            <p className="trustLine">기업 · 사무실 · PC방 · 학교 · 기관 · 개인 매입 상담</p>
          </div>
          <div className="heroVisual" aria-label="폐컴퓨터와 서버 장비 일러스트">
            <div className="serverRack rackA" />
            <div className="serverRack rackB" />
            <div className="monitor"><div className="monitorScreen" /></div>
            <div className="desktopTower" />
            <div className="laptop"><div className="laptopScreen" /></div>
            <div className="visualGlow" />
          </div>
        </div>
      </section>

      <section id="category" className="section categorySection">
        <div className="container threeGrid">
          {categories.map((item, index) => (
            <article className={`categoryCard category${index + 1}`} key={item.title}>
              <div className="categoryIcon">{index === 0 ? 'PC' : index === 1 ? 'SV' : 'IT'}</div>
              <h2>{item.title}</h2>
              <ul>{item.desc.map((line) => <li key={line}>{line}</li>)}</ul>
              <a href="#quote" className="textLink">{item.cta} →</a>
            </article>
          ))}
        </div>
      </section>

      <section id="security" className="securitySection">
        <div className="container securityGrid">
          <div>
            <p className="sectionKicker light">DATA SECURITY</p>
            <h2>컴퓨터는 매입하고<br />중요한 데이터는 <span>확실하게 파기합니다.</span></h2>
            <p>
              폐컴퓨터를 처분할 때 가장 걱정되는 것은 저장장치에 남은 개인정보와 기업 중요 자료입니다.
              올바른매입은 요청 시 HDD 등 저장장치를 전용 천공 장비로 물리적으로 파손해 재사용이 어렵도록 처리합니다.
            </p>
            <a href="#quote" className="btn btnGreen">데이터 파기 포함 견적 문의</a>
          </div>
          <div className="securitySteps">
            <div className="securityStep">
              <span>01</span><div className="driveIcon">HDD</div><strong>저장장치 확인</strong><p>HDD 및 데이터 저장장치 확인</p>
            </div>
            <div className="stepArrow">→</div>
            <div className="securityStep featured">
              <span>02</span><div className="drillIcon">●</div><strong>천공 처리</strong><p>전용 천공기를 이용한 물리적 파손</p>
            </div>
            <div className="stepArrow">→</div>
            <div className="securityStep">
              <span>03</span><div className="driveIcon broken">×</div><strong>폐기·처리</strong><p>파손 저장장치 분류 및 처리</p>
            </div>
          </div>
        </div>
      </section>

      <section id="price" className="section">
        <div className="container">
          <div className="sectionHead">
            <div><p className="sectionKicker">BUYING PRICE</p><h2>오늘의 매입 단가</h2></div>
            <p>품목과 사양, 수량, 상태에 따라 실제 매입가격은 달라질 수 있습니다.</p>
          </div>
          <div className="priceTabs" role="tablist" aria-label="매입 단가 카테고리">
            <button className="active">폐 컴퓨터</button><button>서버 / 네트워크 장비</button><button>통신스크랩 / 불용자재</button>
          </div>
          <div className="priceGrid">
            <div className="tableWrap">
              <table>
                <thead><tr><th>매입 품목</th><th>기준</th><th>매입가</th></tr></thead>
                <tbody>{priceRows.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={cell} className={i === 2 ? 'priceCell' : ''}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <aside className="priceAside"><div className="moneyIcon">₩</div><strong>수량이 많을수록<br />개별 견적을 추천합니다.</strong><a href="#quote" className="btn btnPrimary">사진 보내고 견적받기</a></aside>
          </div>
        </div>
      </section>

      <section id="process" className="section processSection">
        <div className="container">
          <div className="centerHead"><p className="sectionKicker">HOW IT WORKS</p><h2>편한 방법으로 매입 신청하세요!</h2></div>
          <div className="threeGrid flowGrid">
            {flows.map((flow, index) => (
              <article className={`flowCard flow${index + 1}`} key={flow.title}>
                <h3>{flow.title}</h3>
                <div className="flowSteps">
                  {flow.steps.map((step, stepIndex) => (
                    <div className="flowStep" key={step}><span>{String(stepIndex + 1).padStart(2, '0')}</span><p>{step}</p>{stepIndex < flow.steps.length - 1 && <b>↓</b>}</div>
                  ))}
                </div>
                <a href="#quote" className="btn flowButton">{flow.button}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="darkCta">
        <div className="container ctaWrap"><div><h2>사무실 창고에 쌓여 있는 오래된 컴퓨터, 그냥 버리지 마세요.</h2><p>폐PC · 서버 · 네트워크 · 통신장비까지 올바른매입에서 한 번에 확인해드립니다.</p></div><a href="#quote" className="btn btnYellow">사진으로 견적받기</a></div>
      </section>

      <section className="section benefitsSection">
        <div className="container splitBenefits">
          <div><p className="sectionKicker">BULK BUYING</p><h2>한두 대부터 대량 전산장비까지</h2><p className="muted">PC 한 대부터 사무실 이전·폐업·장비 교체 과정에서 발생하는 대량 장비까지 상담할 수 있습니다.</p><div className="miniCards"><div><strong>기업</strong><span>사무실 PC 및 서버 교체</span></div><div><strong>PC방</strong><span>PC·모니터 대량매입</span></div><div><strong>학교·기관</strong><span>불용 전산장비 수거 상담</span></div><div><strong>사업장</strong><span>폐업·이전 장비 일괄 처리</span></div></div></div>
          <div><p className="sectionKicker">WHY OLBARUN</p><h2>올바른매입을 선택하는 이유</h2><div className="reasonGrid"><div><strong>합리적인 매입가격</strong><span>품목·사양·상태 기반 견적</span></div><div><strong>전국 택배매입</strong><span>지역과 관계없이 상담 가능</span></div><div><strong>출장 대량매입</strong><span>기업·사업장 대량 물량 대응</span></div><div><strong>HDD 물리적 파기</strong><span>중요 저장장치 천공 처리</span></div></div></div>
        </div>
      </section>

      <section id="quote" className="quoteSection">
        <div className="container quoteGrid">
          <div><p className="sectionKicker light">QUICK QUOTE</p><h2>폐컴퓨터, 얼마나 받을 수 있을까요?</h2><p>모델명이나 사양을 몰라도 괜찮습니다.<br />사진과 대략적인 수량만 알려주셔도 확인할 수 있습니다.</p></div>
          <form className="quoteForm">
            <label>매입 품목<select defaultValue="폐컴퓨터"><option>폐컴퓨터</option><option>서버 / 네트워크</option><option>통신장비 / 불용자재</option><option>기타</option></select></label>
            <label>수량<input type="text" placeholder="예: 데스크탑 약 30대" /></label>
            <fieldset><legend>매입방법</legend><label><input type="radio" name="method" defaultChecked /> 택배</label><label><input type="radio" name="method" /> 출장</label><label><input type="radio" name="method" /> 수거 문의</label></fieldset>
            <label>사진 첨부<input type="file" /></label>
            <button type="button" className="btn btnPrimary quoteButton">무료 견적 신청</button>
          </form>
        </div>
      </section>

      <footer className="footer"><div className="container footerGrid"><div className="brand footerBrand"><span className="brandMark">↻</span><span>올바른매입</span></div><div><strong>고객센터</strong><p>연락처 및 운영시간은 추후 입력</p></div><div><strong>사업자 정보</strong><p>상호 · 대표자 · 사업자등록번호 추후 입력</p></div><div><strong>안내</strong><p>회사소개 · 이용약관 · 개인정보처리방침</p></div></div></footer>
    </main>
  );
}
