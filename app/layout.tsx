import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '올바른매입 | 폐컴퓨터 중고컴퓨터 매입 | 서버·전산장비 전국매입',
  description:
    '올바른매입은 전국 폐컴퓨터·중고컴퓨터·서버·네트워크 장비·전산장비를 전문 매입합니다. 기업, 관공서, 학교, 병원, 사무실의 불용 IT자산과 대량 컴퓨터를 출장 수거하며 HDD·SSD 데이터 삭제 및 물리적 파기까지 안전하게 처리합니다.',
  keywords: [
    '폐컴퓨터 매입',
    '중고컴퓨터 매입',
    '컴퓨터 매입',
    '폐컴퓨터 수거',
    '컴퓨터 수거',
    '컴퓨터 폐기',
    '서버 매입',
    '중고서버 매입',
    '서버 폐기',
    '전산장비 매입',
    '전산장비 폐기',
    '사무실 컴퓨터 매입',
    '기업 컴퓨터 매입',
    '대량 컴퓨터 매입',
    '불용자산 매입',
    '불용 전산장비 매입',
    '네트워크 장비 매입',
    '통신장비 매입',
    '하드디스크 파기',
    'HDD 천공',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
