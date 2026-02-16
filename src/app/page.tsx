<<<<<<< HEAD
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
=======
"use client";

import { useState } from "react";
import { calculateBill, calculateSavings } from "@/lib/electricity";
import AdSense from "@/components/AdSense";

const ONE_ROOM_AVERAGE_USAGE = 220;

export default function Home() {
  const [usage, setUsage] = useState(250); // 월간 사용량 (kWh)
  const [lastMonthUsage, setLastMonthUsage] = useState(220); // 지난달 사용량 (kWh)
  const [reduceAmount, setReduceAmount] = useState(30); // 절약 목표량

  // 음수/NaN 방지
  const safeUsage = Math.max(0, usage || 0);
  const safeLastMonthUsage = Math.max(0, lastMonthUsage || 0);
  const bill = calculateBill(safeUsage);
  const lastMonthBill = calculateBill(safeLastMonthUsage);
  const reducedBill = calculateBill(Math.max(0, safeUsage - reduceAmount));
  const savings = calculateSavings(safeUsage, Math.max(0, safeUsage - reduceAmount));
  const usageDelta = safeUsage - ONE_ROOM_AVERAGE_USAGE;
  const usageDeltaPercent = Math.round(
    (Math.abs(usageDelta) / ONE_ROOM_AVERAGE_USAGE) * 100
  );
  const billDelta = bill.total - lastMonthBill.total;
  const billDeltaPercent =
    lastMonthBill.total > 0
      ? Math.round((Math.abs(billDelta) / lastMonthBill.total) * 100)
      : 0;
  const annualSavings = savings * 12;
  const savingsPercent =
    bill.total > 0 ? Math.round((savings / bill.total) * 100) : 0;

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
          {/* 미니 배지 */}
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              자취생 추천
            </span>
            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              겨울 난방비 특화
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                usageDelta > 0
                  ? "bg-red-100 text-red-700"
                  : usageDelta < 0
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              원룸 평균 대비{" "}
              {usageDelta === 0
                ? "동일"
                : `${usageDelta > 0 ? "+" : "-"}${Math.abs(usageDelta)}kWh (${usageDeltaPercent}%)`}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            ⚡ 고지서 기반 전기세 계산기
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            자취 전기세 계산, 원룸 전기요금 미리 확인하세요
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
                  className="flex-1 rounded-xl border-2 border-slate-300 px-4 py-3 text-xl sm:text-2xl font-bold focus:border-blue-500 focus:outline-none"
                  value={usage}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setUsage(isNaN(val) ? 0 : Math.max(0, val));
                  }}
                />
                <span className="text-lg sm:text-xl font-semibold text-slate-500">
                  kWh
                </span>
              </div>
            </label>
            <p className="mt-2 text-xs text-slate-500">
              💡 원룸 평균 200~300kWh
            </p>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-slate-700">
                지난달 사용량 (비교용)
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  step="10"
                  className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-2 text-lg font-semibold focus:border-blue-500 focus:outline-none"
                  value={lastMonthUsage}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLastMonthUsage(isNaN(val) ? 0 : Math.max(0, val));
                  }}
                />
                <span className="text-base font-semibold text-slate-500">kWh</span>
              </div>
            </label>

            {/* 버튼 영역 */}
            <div className="mt-4 flex gap-2">
              <a
                href="https://cyber.kepco.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <span>📱</span>
                <span>한전에서 사용량 확인</span>
              </a>
              <button
                onClick={() => {
                  setUsage(250);
                  setLastMonthUsage(220);
                  setReduceAmount(30);
                }}
                className="rounded-xl border-2 border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* 결과 표시 - 예상 청구액 */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl">
          <div className="text-sm font-medium opacity-90">⚡ 예상 청구 금액</div>
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
          <div className="mt-4 rounded-xl bg-white/10 p-4">
            <div className="text-xs uppercase tracking-wide opacity-80">
              이번 달 예상 전기세 vs 지난달
            </div>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-2xl font-bold">
                {billDelta > 0 ? "+" : billDelta < 0 ? "-" : ""}
                {Math.abs(billDelta).toLocaleString()}원
              </span>
              <span className="text-sm opacity-85">
                {billDelta === 0 ? "변동 없음" : `${billDeltaPercent}% ${billDelta > 0 ? "증가" : "감소"}`}
              </span>
            </div>
            <div className="mt-1 text-xs opacity-85">
              이번 달 {bill.total.toLocaleString()}원 / 지난달 {lastMonthBill.total.toLocaleString()}원
            </div>
          </div>
        </div>

        {/* 광고 슬롯 1 - 결과 바로 아래 (최고 전환 위치) */}
        <div className="mb-6">
          <AdSense slot="1234567890" format="horizontal" />
        </div>

        {/* 누진구간 시각화 */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-4">📊 전기요금 누진구간 현황</h2>

          {/* 프로그레스 바 - 400kWh 기준 */}
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
                width: `${Math.min((safeUsage / 400) * 100, 100)}%`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold">
              <span className="text-slate-600">0</span>
              <span className="text-slate-600">200</span>
              <span className="text-slate-600 font-bold text-red-600">400 초과 주의!</span>
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
          <h2 className="text-lg font-semibold mb-4">💰 전기세 절약 시뮬레이터</h2>
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
              max={Math.min(safeUsage, 100)}
              step="5"
              className="mt-2 w-full"
              value={reduceAmount}
              onChange={(e) => setReduceAmount(Number(e.target.value))}
            />
          </label>

          <div className="mt-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 p-5 border border-emerald-200">
            <div className="text-sm text-green-800">
              {reduceAmount}kWh 줄이면
            </div>
            <div className="text-5xl font-extrabold text-green-700 mt-1 leading-none">
              {savings.toLocaleString()}원 절약
            </div>
            <div className="mt-2 text-base font-semibold text-emerald-700">
              현재 예상요금의 약 {savingsPercent}% 절감
            </div>
            <div className="text-sm text-green-700 mt-1">
              1년 기준 약 {annualSavings.toLocaleString()}원 절약 가능
            </div>
            <div className="text-sm text-green-600 mt-2">
              {safeUsage}kWh → {Math.max(0, safeUsage - reduceAmount)}kWh
              <span className="ml-2">
                ({reducedBill.tier.tierName})
              </span>
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
          <h2 className="text-lg font-semibold mb-4">🔥 자취생 겨울철 전기요금 절약 팁</h2>
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

        {/* FAQ 섹션 - SEO */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-4">💬 자주 묻는 질문</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900 hover:text-blue-600">
                kWh(사용량)는 어디서 확인하나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600 pl-4">
                한전 앱(한전ON), 한전 사이버지점(cyber.kepco.co.kr), 또는 매월 받는 전기요금 고지서에서 확인할 수 있습니다.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900 hover:text-blue-600">
                누진구간이 뭔가요?
              </summary>
              <p className="mt-2 text-sm text-slate-600 pl-4">
                전기 사용량이 많을수록 kWh당 요금이 비싸지는 제도입니다. 200kWh 이하(1단계), 201~400kWh(2단계), 400kWh 초과(3단계)로 나뉘며, 3단계는 1단계보다 약 2.7배 비쌉니다.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900 hover:text-blue-600">
                실제 고지서와 금액이 달라요
              </summary>
              <p className="mt-2 text-sm text-slate-600 pl-4">
                본 계산기는 주거용(저압) 기준 참고용입니다. TV수신료, 복지할인, 계절별 요금 차이 등에 따라 실제 청구액과 다를 수 있습니다.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900 hover:text-blue-600">
                원룸 평균 전기 사용량은?
              </summary>
              <p className="mt-2 text-sm text-slate-600 pl-4">
                1인 가구 원룸 기준 월 평균 150~250kWh입니다. 여름/겨울 냉난방기 사용 시 300~400kWh까지 올라갈 수 있습니다.
              </p>
            </details>
          </div>
        </div>

        {/* 광고 슬롯 2 - 페이지 하단 */}
        <div className="mb-6">
          <AdSense slot="0987654321" format="rectangle" />
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-slate-500 space-y-1">
          <div className="rounded-lg bg-amber-50 px-4 py-2 text-amber-700 font-medium inline-block">
            ⚠️ 본 계산기는 참고용이며, 실제 청구 금액과 다를 수 있습니다
          </div>
          <div className="mt-2">
            요금 계산은 한국전력 주거용(저압) 요금표 기준입니다.
          </div>
          <div className="text-slate-400">
            고압 사용자 및 기타 계약 유형은 요금이 다를 수 있습니다.
          </div>
          <div className="mt-3 text-slate-400">
            © 2026 자취전기세 계산기 | 문의: contact@example.com
          </div>
        </footer>
      </section>
    </main>
>>>>>>> 2adc14c (feat: add electricity bill calculator MVP)
  );
}
