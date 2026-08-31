import { notFound } from 'next/navigation';

const busan=[
['jung-gu','중구'],['seo-gu','서구'],['dong-gu','동구'],['yeongdo-gu','영도구'],['busanjin-gu','부산진구'],['dongnae-gu','동래구'],['nam-gu','남구'],['buk-gu','북구'],['haeundae-gu','해운대구'],['saha-gu','사하구'],['geumjeong-gu','금정구'],['gangseo-gu','강서구'],['yeonje-gu','연제구'],['suyeong-gu','수영구'],['sasang-gu','사상구'],['gijang-gun','기장군']
] as const;
const gyeongnam=[
['changwon','창원시'],['gimhae','김해시'],['yangsan','양산시'],['jinju','진주시'],['geoje','거제시'],['tongyeong','통영시'],['sacheon','사천시'],['miryang','밀양시'],['geochang','거창군'],['hamyang','함양군'],['hapcheon','합천군'],['changnyeong','창녕군'],['goseong','고성군'],['namhae','남해군'],['hadong','하동군'],['sancheong','산청군'],['uiryeong','의령군']
] as const;

export const dynamic='force-dynamic';

type Props={params:Promise<{region:string;slug?:string[]}>};
export default async function RegionalBuyPage({params}:Props){
 const {region,slug}=await params;
 const isBusan=region==='busan';
 const isGyeongnam=region==='gyeongnam';
 if(!isBusan&&!isGyeongnam)notFound();
 const areas=isBusan?busan:gyeongnam;
 const areaSlug=slug?.[0];
 const area=areaSlug?areas.find(x=>x[0]===areaSlug):undefined;
 if(areaSlug&&!area)notFound();
 const regionName=isBusan?'부산':'경남';
 const areaName=area?.[1];
 const title=areaName?`${areaName} 폐컴퓨터 매입`:`${regionName} 폐컴퓨터 출장매입`;
 const imageBase=areaSlug?`/images/buy/${region}/${areaSlug}`:'';
 return <main>
 <header className="siteHeader"><div className="container navWrap"><a href="/" className="brand"><span className="brandMark">↻</span><span>올바른<span className="brandBlue">매입</span></span></a><nav className="desktopNav"><a href="/">폐컴퓨터 매입</a><a href="/process">매입절차</a><a href="/request">수거신청서</a><a href="/customer/notice">고객센터</a></nav></div></header>
 <section className="hero"><div className="container" style={{padding:'72px 0'}}><p className="sectionKicker">BUSAN · GYEONGNAM ON-SITE BUYING</p><h1 style={{fontSize:48,margin:'8px 0 18px'}}>{title}</h1><p className="heroDesc">{areaName?`${areaName} 전 지역에서 폐컴퓨터, 서버·네트워크 장비, 통신스크랩과 불용 전산장비의 출장매입을 상담합니다.`:`올바른매입은 부산·경남 지역을 중심으로 기업, 사무실, PC방, 학교·기관의 불용 전산장비 출장매입을 진행합니다.`}</p><div className="heroActions"><a href="/request/visit" className="btn btnPrimary">출장매입 견적문의</a><a href="/request/pickup" className="btn btnGhost">수거 신청하기</a></div></div></section>
 {areaName&&<section className="section"><div className="container"><div style={{minHeight:280,border:'1px dashed #b8c7da',borderRadius:16,display:'grid',placeItems:'center',background:'#f8fbff',color:'#748296'}}><span>이미지 업로드 위치: {imageBase}-hero.webp</span></div></div></section>}
 <section className="section"><div className="container"><div className="sectionHead"><div><p className="sectionKicker">SERVICE AREA</p><h2>{areaName?`${areaName} 출장매입 안내`:`${regionName} 지역별 출장매입`}</h2></div></div>{!areaName?<div className="threeGrid">{areas.map(([s,n])=><article className="categoryCard" key={s}><h2>{n} 폐컴퓨터 매입</h2><p style={{color:'#667990',lineHeight:1.8}}>폐컴퓨터·서버·네트워크·불용 전산장비 출장매입 상담</p><a className="textLink" href={`/buy/${region}/${s}`}>지역 페이지 보기 →</a></article>)}</div>:<><div className="processDetailGrid"><div><strong>폐컴퓨터·모니터</strong><p>사무용 PC, 노트북, 모니터, 일체형 PC와 사업장 불용 장비를 수량과 사양에 따라 견적합니다.</p></div><div><strong>서버·네트워크 장비</strong><p>랙서버, 워크스테이션, 스위치, 라우터, UPS 등 기업 전산장비도 함께 상담할 수 있습니다.</p></div><div><strong>대량 출장매입</strong><p>사무실 이전, 폐업, 장비 교체처럼 물량이 많은 경우 현장 상황을 확인해 일정과 수거 방식을 협의합니다.</p></div><div><strong>HDD 데이터 파기</strong><p>개인정보와 중요 자료가 저장된 HDD 등 저장장치는 요청 시 물리적 천공 파기 상담이 가능합니다.</p></div></div><div style={{minHeight:260,marginTop:38,border:'1px dashed #b8c7da',borderRadius:16,display:'grid',placeItems:'center',background:'#f8fbff',color:'#748296'}}><span>본문 이미지 업로드 위치: {imageBase}-content.webp</span></div></>}</div></section>
 <section className="darkCta"><div className="container ctaWrap"><div><h2>{areaName?`${areaName} 출장매입이 필요하신가요?`:`부산·경남 출장매입 상담`}</h2><p>품목과 수량을 알려주시면 현장에 맞는 매입 방법을 안내해드립니다.</p></div><a href="/request/visit" className="btn btnYellow">방문견적 의뢰서</a></div></section>
 </main>;
}
