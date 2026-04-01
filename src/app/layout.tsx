import type { Metadata } from "next";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "276홀딩스 | 중소기업 공급망 금융 플랫폼 — FlowPay · FlowScore · FlowPoint",
  description: "매출채권 유동화, 구매대금 선결제(SNPL), AI 신용평가로 중소기업의 자금 흐름을 개선하는 B2B 핀테크 플랫폼. 누적 6,890억원+ 중개, 1,100개사 파트너.",
  keywords: ["276홀딩스", "FlowPay", "FlowScore", "FlowPoint", "중소기업 금융", "매출채권", "SNPL", "B2B 핀테크"],
  openGraph: {
    title: "276홀딩스 | 중소기업 공급망 금융 플랫폼",
    description: "매출채권 유동화, 구매대금 선결제(SNPL), AI 신용평가 — B2B 핀테크 플랫폼",
    url: "https://276holdings.com",
    siteName: "276홀딩스",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
