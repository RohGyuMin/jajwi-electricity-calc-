import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "자취 전기세 계산기 | 원룸 전기요금 누진구간 계산",
  description:
    "전기 사용량(kWh)만 입력하면 자취 전기세를 바로 계산합니다. 원룸 전기요금 누진구간 확인, 절약 시뮬레이션까지 한번에.",
  keywords: [
    "자취 전기세",
    "자취 전기세 계산기",
    "원룸 전기요금",
    "원룸 전기세",
    "전기요금 누진구간",
    "전기세 계산",
    "한전 전기요금",
    "kWh 요금",
  ],
  openGraph: {
    title: "자취 전기세 계산기 | 원룸 전기요금 계산",
    description:
      "전기 사용량(kWh)만 입력하면 자취 전기세를 바로 계산합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {/* Google AdSense */}
        {ADSENSE_CLIENT_ID && (
          <>
            <meta
              name="google-adsense-account"
              content={ADSENSE_CLIENT_ID}
            />
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
