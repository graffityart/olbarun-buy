import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '올바른매입 | 폐컴퓨터·서버·통신장비 매입',
  description: '폐컴퓨터, 서버·네트워크 장비, 통신스크랩과 불용자재를 매입하고 HDD 등 중요 저장장치는 물리적 천공 파기를 지원합니다.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
