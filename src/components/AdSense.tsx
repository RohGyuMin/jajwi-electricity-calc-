"use client";

import { useEffect } from "react";

type AdSenseProps = {
  slot: string; // AdSense 광고 슬롯 ID
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Google AdSense 광고 컴포넌트
 *
 * 사용법:
 * 1. .env.local에 NEXT_PUBLIC_ADSENSE_CLIENT_ID 추가
 * 2. layout.tsx에 AdSense 스크립트 추가
 * 3. 원하는 위치에 <AdSense slot="광고슬롯ID" /> 삽입
 */
export default function AdSense({
  slot,
  format = "auto",
  style,
  className = "",
}: AdSenseProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (clientId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense 초기화 실패 시 무시
      }
    }
  }, [clientId]);

  // 개발 환경 또는 Client ID 없으면 placeholder 표시
  if (!clientId) {
    return (
      <div
        className={`rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center ${className}`}
        style={style}
      >
        <div className="text-sm text-slate-400">AdSense 광고 영역</div>
        <div className="text-xs text-slate-400 mt-1">
          slot: {slot} | format: {format}
        </div>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
