import type { Metadata } from 'next';
import './globals.css';
import './region-menu.css';
import './logo.css';
import './mobile-menu.css';
import './local-seo.css';
import './dongnae-local.css';
import './haeundae-seo.css';
import './saha-local.css';
import './geumjeong-local.css';
import './sasang-local.css';
import './gangseo-local.css';
import './yeonje-local.css';
import './suyeong-local.css';
import './namgu-local.css';
import './bukgu-local.css';
import './donggu-local.css';
import './junggu-local.css';
import './seogu-local.css';
import './yeongdo-local.css';
import './gijang-local.css';

const title='올바른매입 | 폐컴퓨터 중고컴퓨터 매입 | 서버·전산장비 전국매입';
const description='올바른매입은 전국 폐컴퓨터·중고컴퓨터·서버·네트워크 장비·전산장비를 전문 매입합니다. 기업, 관공서, 학교, 병원, 사무실의 불용 IT자산과 대량 컴퓨터를 출장 수거하며 HDD·SSD 데이터 삭제 및 물리적 파기까지 안전하게 처리합니다.';
export const metadata: Metadata={metadataBase:new URL('https://pumasy.co.kr'),title,description,alternates:{canonical:'/'},keywords:['폐컴퓨터 매입','중고컴퓨터 매입','컴퓨터 매입','폐컴퓨터 수거','컴퓨터 수거','컴퓨터 폐기','서버 매입','중고서버 매입','서버 폐기','전산장비 매입','전산장비 폐기','사무실 컴퓨터 매입','기업 컴퓨터 매입','대량 컴퓨터 매입','불용자산 매입','불용 전산장비 매입','네트워크 장비 매입','통신장비 매입','하드디스크 파기','HDD 천공'],openGraph:{title,description,url:'https://pumasy.co.kr',siteName:'올바른매입',locale:'ko_KR',type:'website'},twitter:{card:'summary_large_image',title,description},robots:{index:true,follow:true,googleBot:{index:true,follow:true}}};
const organizationSchema={'@context':'https://schema.org','@type':'Organization',name:'올바른매입',url:'https://pumasy.co.kr',description:'전국 폐컴퓨터·중고컴퓨터·서버·전산장비·네트워크 장비 및 기업 불용 IT자산 매입과 저장장치 데이터 파기 상담',areaServed:{'@type':'Country',name:'대한민국'},knowsAbout:['폐컴퓨터 매입','중고컴퓨터 매입','서버 매입','전산장비 매입','네트워크 장비 매입','HDD 데이터 파기']};
const websiteSchema={'@context':'https://schema.org','@type':'WebSite',name:'올바른매입',url:'https://pumasy.co.kr',inLanguage:'ko-KR'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ko"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/></body></html>}
