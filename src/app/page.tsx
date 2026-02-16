"use client";

import Link from "next/link";
import { useState } from "react";
import { calculateBill, calculateSavings } from "@/lib/electricity";

export default function Home() {
  const [usage, setUsage] = useState(250); // 월간 사용량 (kWh)
  const [reduceAmount, setReduceAmount] = useState(30); // 절약 목표량

  const bill = calculateBill(usage);
  const reducedBill = calculateBill(Math.max(0, usage - reduceAmount));
  const savings = calculateSavings(usage, Math.max(0, usage - reduceAmount));

  // 누진구간 색상
  const tierColor =
    bill.tier.tier === 1
      ? "text-green-600 bg-green-50"
      : bill.tier.tier === 2
      ? "text-orange-600 bg-orange-50"
      : "text-red-600 bg-red-50";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* HERO + 계산기 입력 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            ⚡ 자취전기세 계산기
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            이번 달 전기세, 고지서 보기 전에 확인하세요
          </p>

          {/* 입력 카드 */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg border border-slate-200">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                월간 전기 사용량 입력
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  step="10"
                  className="flex-1 rounded-xl border-2 border-slate-300 px-4 py-3 text-2xl font-bold focus:border-blue-500 focus:outline-none"
                  value={usage}
                  onChange={(e) => setUsage(Number(e.target.value))}
                />
                <span className="text-xl font-semibold text-slate-500">kWh</span>
              </div>
            </label>
            <p className="mt-2 text-xs text-slate-500">
              💡 고지서나 한전 앱에서 확인 가능 (원룸 평균 200~300kWh)
            </p>
          </div>
        </div>

        {/* 결과 표시 - 예상 청구액 */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl">
          <div className="text-sm font-medium opacity-90">예상 청구 금액</div>
          <div className="mt-1 text-5xl font-bold">
            {bill.total.toLocaleString()}
            <span className="text-2xl ml-2">원</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm opacity-90">
            <span className={`rounded-full px-3 py-1 ${tierColor} font-semibold`}>
              {bill.tier.tierName}
            </span>
            <span>{bill.tier.range}</span>
          </div>
        </div>

        {/* 누진구간 시각화 */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-4">누진구간 현황</h2>

          {/* 프로그레스 바 */}
          <div className="relative h-8 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`absolute h-full transition-all duration-500 ${
                bill.tier.tier === 1
                  ? "bg-green-500"
                  : bill.tier.tier === 2
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${Math.min((usage / 500) * 100, 100)}%`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold">
              <span className="text-slate-600">0</span>
              <span className="text-slate-600">200</span>
              <span className="text-slate-600">400</span>
              <span className="text-slate-600">500+</span>
            </div>
          </div>

          {/* 다음 구간까지 남은 여유분 */}
          {bill.nextTierRemaining !== null && (
            <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              <span className="font-semibold">
                다음 구간까지 {bill.nextTierRemaining.toFixed(0)}kWh 남음
              </span>
              <span className="ml-2">
                - 초과하면 요금이 급격히 증가합니다!
              </span>
            </div>
          )}

          {/* 요금 상세 */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>기본요금</span>
              <span>{bill.baseCharge.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>전력량 요금</span>
              <span>{Math.round(bill.energyCharge).toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>부가세 + 기금</span>
              <span>{(bill.vat + bill.fundCharge).toLocaleString()}원</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 pt-2 border-t">
              <span>총 청구액</span>
              <span>{bill.total.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* 절약 시뮬레이터 */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-4">💰 절약 시뮬레이터</h2>
          <p className="text-sm text-slate-600 mb-4">
            사용량을 얼마나 줄이면 얼마를 절약할 수 있을까요?
          </p>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              절약 목표: <b className="text-blue-600">{reduceAmount}kWh</b> 감소
            </span>
            <input
              type="range"
              min="0"
              max={Math.min(usage, 100)}
              step="5"
              className="mt-2 w-full"
              value={reduceAmount}
              onChange={(e) => setReduceAmount(Number(e.target.value))}
            />
          </label>

          <div className="mt-4 rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="text-sm text-green-800">
              {reduceAmount}kWh 줄이면
            </div>
            <div className="text-3xl font-bold text-green-700 mt-1">
              {savings.toLocaleString()}원 절약
            </div>
            <div className="text-sm text-green-600 mt-2">
              {usage}kWh → {Math.max(0, usage - reduceAmount)}kWh
              <span className="ml-2">({reducedBill.tier.tierName})</span>
            </div>
          </div>

          {/* 구체적 행동 제안 */}
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <span>🌡️</span>
              <span>온도 2도 낮추기 = 월 약 30kWh 절약</span>
            </div>
            <div className="flex items-start gap-2">
              <span>⏰</span>
              <span>하루 2시간 사용 줄이기 = 월 약 20kWh 절약</span>
            </div>
            <div className="flex items-start gap-2">
              <span>🔌</span>
              <span>대기전력 차단 = 월 약 10kWh 절약</span>
            </div>
          </div>
        </div>

        {/* 절약 팁 */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-4">🔥 겨울철 난방비 절약 팁</h2>
          <div className="space-y-3">
            {[
              {
                title: "문풍지 + 단열 커튼",
                desc: "외부 찬 공기 차단으로 난방 효율 20% 향상",
              },
              {
                title: "타이머 콘센트 활용",
                desc: "자는 동안 자동 꺼짐으로 불필요한 사용 방지",
              },
              {
                title: "전기장판 > 히터",
                desc: "전기장판 150W vs 히터 1500W (10배 차이)",
              },
              {
                title: "실내 적정 온도 18~20도",
                desc: "1도 낮추면 약 7%의 전기 절약 효과",
              },
              {
                title: "두꺼운 옷 입기",
                desc: "내복 착용만으로도 체감온도 2~3도 상승",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="rounded-lg bg-slate-50 p-4 border border-slate-200"
              >
                <div className="font-semibold text-slate-900">{tip.title}</div>
                <div className="text-sm text-slate-600 mt-1">{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 제휴 상품 추천 (광고 위치 1) */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm border border-amber-200">
          <h2 className="text-lg font-semibold mb-3 text-amber-900">
            🛒 절약 필수템
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "문풍지 (접착식)", price: "5,000원대" },
              { name: "단열 커튼", price: "15,000원대" },
              { name: "전기장판", price: "30,000원대" },
              { name: "타이머 콘센트", price: "8,000원대" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-3 shadow-sm border border-amber-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="font-medium text-slate-900">{item.name}</div>
                <div className="text-sm text-amber-700 mt-1">{item.price}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            * 쿠팡파트너스 제휴 링크 (실제 연동 예정)
          </p>
        </div>

        {/* 롱테일 페이지 내부 링크 */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-4">🔎 전기요금 상세 가이드</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/원룸-전기세-계산기"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              원룸 전기세 계산기
            </Link>
            <Link
              href="/전기히터-전기세-계산기"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              전기히터 전기세 계산기
            </Link>
            <Link
              href="/전기장판-전기요금"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              전기장판 전기요금
            </Link>
          </div>
        </div>

        {/* 광고 슬롯 2 */}
        <div className="mb-6 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
          <div className="text-sm text-slate-400">Google AdSense 광고 영역</div>
          <div className="text-xs text-slate-400 mt-1">
            (네이티브 광고 - 결과 하단)
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-slate-500 space-y-1">
          <div>
            요금 계산은 한국전력 주거용 저압 요금표(2024년 기준)를 따릅니다.
          </div>
          <div>실제 청구 금액과 다소 차이가 있을 수 있습니다.</div>
          <div className="mt-3 text-slate-400">
            © 2026 자취전기세 계산기 | 문의: contact@example.com
          </div>
        </footer>
      </section>
    </main>
  );
}
