"use client";

import Link from "next/link";
import { useState } from "react";
import { calculateBill, calculateSavings } from "@/lib/electricity";

const PRODUCT_ITEMS = [
  {
    name: "문풍지 (접착식)",
    desc: "외풍 차단으로 난방 효율 개선",
    price: "5,000원대",
    href: "https://www.coupang.com/np/search?q=%EB%AC%B8%ED%92%8D%EC%A7%80",
  },
  {
    name: "단열 커튼",
    desc: "실내 열손실 감소, 체감온도 유지",
    price: "15,000원대",
    href: "https://www.coupang.com/np/search?q=%EB%8B%A8%EC%97%B4+%EC%BB%A4%ED%8A%BC",
  },
  {
    name: "전기장판",
    desc: "저전력 보조 난방으로 비용 절감",
    price: "30,000원대",
    href: "https://www.coupang.com/np/search?q=%EC%A0%84%EA%B8%B0%EC%9E%A5%ED%8C%90",
  },
  {
    name: "타이머 콘센트",
    desc: "자동 ON/OFF로 사용시간 관리",
    price: "8,000원대",
    href: "https://www.coupang.com/np/search?q=%ED%83%80%EC%9D%B4%EB%A8%B8+%EC%BD%98%EC%84%BC%ED%8A%B8",
  },
];

const FAQ_ITEMS = [
  {
    question: "원룸 전기세는 보통 얼마나 나오나요?",
    answer:
      "계절과 사용 습관에 따라 다르지만 1인 가구 원룸 기준으로 월 150~250kWh를 많이 사용합니다. 냉난방을 오래 쓰면 300kWh 이상으로 올라갈 수 있습니다.",
  },
  {
    question: "누진구간은 왜 중요한가요?",
    answer:
      "월 사용량이 높아질수록 kWh당 단가가 올라가는 구조라서, 같은 사용량 증가라도 구간에 따라 요금 상승 폭이 달라집니다.",
  },
  {
    question: "실제 고지서와 계산 결과가 다른 이유는 뭔가요?",
    answer:
      "본 계산기는 참고용이며, 계약 유형·복지 할인·계절 요금·기타 항목에 따라 실제 청구액과 차이가 발생할 수 있습니다.",
  },
];

export default function Home() {
  const [usage, setUsage] = useState(250); // 월간 사용량 (kWh)
  const [reduceAmount, setReduceAmount] = useState(30); // 절약 목표량

  const safeUsage = Math.max(0, usage || 0);
  const reducedUsage = Math.max(0, safeUsage - reduceAmount);
  const bill = calculateBill(safeUsage);
  const reducedBill = calculateBill(reducedUsage);
  const savings = calculateSavings(safeUsage, reducedUsage);
  const savingsRate = bill.total > 0 ? Math.round((savings / bill.total) * 100) : 0;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const tierColor =
    bill.tier.tier === 1
      ? "text-green-600 bg-green-50"
      : bill.tier.tier === 2
      ? "text-orange-600 bg-orange-50"
      : "text-red-600 bg-red-50";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-32 -left-16 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              원룸 전기요금 빠른 계산
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              자취 전기세 계산기
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              이번 달 고지서 열기 전에 요금을 먼저 확인하세요. 사용량(kWh)만 입력하면
              누진구간, 예상 청구액, 절약 가능 금액을 한 번에 보여줍니다.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <label className="block">
                <span className="text-sm font-semibold text-slate-200">
                  월간 전기 사용량
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    className="flex-1 rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-2xl font-bold text-white focus:border-cyan-400 focus:outline-none"
                    value={usage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setUsage(Number.isNaN(val) ? 0 : Math.max(0, val));
                    }}
                  />
                  <span className="text-lg font-semibold text-slate-400">kWh</span>
                </div>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {[180, 250, 320].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setUsage(preset)}
                    className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
                  >
                    {preset}kWh
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/30 to-blue-600/40 p-6 shadow-2xl">
            <div className="text-sm font-semibold text-cyan-100">이번 달 예상 청구액</div>
            <div className="mt-1 text-5xl font-extrabold text-white">
              {bill.total.toLocaleString()}
              <span className="ml-2 text-2xl font-semibold">원</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm text-slate-800">
              <span className={`rounded-full px-2 py-0.5 ${tierColor} font-semibold`}>
                {bill.tier.tierName}
              </span>
              <span>{bill.tier.range}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-cyan-50">
              <div className="rounded-xl bg-black/20 p-3">
                <div className="opacity-80">전력량 요금</div>
                <div className="mt-1 text-base font-bold text-white">
                  {Math.round(bill.energyCharge).toLocaleString()}원
                </div>
              </div>
              <div className="rounded-xl bg-black/20 p-3">
                <div className="opacity-80">부가세 + 기금</div>
                <div className="mt-1 text-base font-bold text-white">
                  {(bill.vat + bill.fundCharge).toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">누진구간 현황</h2>
            <div className="mt-4 relative h-8 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`absolute h-full transition-all duration-500 ${
                  bill.tier.tier === 1
                    ? "bg-green-500"
                    : bill.tier.tier === 2
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min((safeUsage / 500) * 100, 100)}%`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold text-slate-200">
                <span>0</span>
                <span>200</span>
                <span>400</span>
                <span>500+</span>
              </div>
            </div>
          {bill.nextTierRemaining !== null && (
              <div className="mt-3 rounded-lg border border-blue-300/20 bg-blue-400/10 p-3 text-sm text-blue-100">
                <span className="font-semibold">
                다음 구간까지 {bill.nextTierRemaining.toFixed(0)}kWh 남음
                </span>
                <span className="ml-2">- 경계 전 사용량 관리가 중요합니다.</span>
              </div>
            )}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>기본요금</span>
                <span>{bill.baseCharge.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>전력량 요금</span>
                <span>{Math.round(bill.energyCharge).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>부가세 + 기금</span>
                <span>{(bill.vat + bill.fundCharge).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-white">
                <span>총 청구액</span>
                <span>{bill.total.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-6">
            <h2 className="text-lg font-semibold text-white">절약 시뮬레이터</h2>
            <p className="mt-2 text-sm text-emerald-100">
              절약 목표를 조절해 이번 달 절감 예상액을 바로 확인하세요.
            </p>
            <label className="mt-4 block">
              <span className="text-sm font-medium text-emerald-50">
                절약 목표: <b>{reduceAmount}kWh</b> 감소
              </span>
              <input
                type="range"
                min="0"
                max={Math.min(safeUsage, 100)}
                step="5"
                className="mt-2 w-full accent-emerald-400"
                value={reduceAmount}
                onChange={(e) => setReduceAmount(Number(e.target.value))}
              />
            </label>
            <div className="mt-4 rounded-xl bg-white p-4 text-slate-900">
              <div className="text-sm font-medium text-emerald-700">{reduceAmount}kWh 줄이면</div>
              <div className="mt-1 text-4xl font-extrabold text-emerald-700">
                {savings.toLocaleString()}원
              </div>
              <div className="mt-2 text-sm text-slate-600">
                {safeUsage}kWh → {reducedUsage}kWh ({reducedBill.tier.tierName})
              </div>
              <div className="mt-1 text-sm font-semibold text-emerald-700">
                예상 요금의 약 {savingsRate}% 절감
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">겨울철 난방비 절약 팁</h2>
            <div className="mt-4 space-y-3">
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
                  className="rounded-xl border border-white/10 bg-slate-900/50 p-4"
                >
                  <div className="font-semibold text-white">{tip.title}</div>
                  <div className="mt-1 text-sm text-slate-300">{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-400/10 to-orange-500/15 p-6">
            <h2 className="text-lg font-semibold text-amber-100">절약 필수템</h2>
            <p className="mt-2 text-sm text-amber-50/90">
              바로 클릭 가능한 구매 링크입니다. 원하는 제품을 눌러 비교해보세요.
            </p>
            <div className="mt-4 grid gap-3">
              {PRODUCT_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group rounded-xl border border-amber-200/20 bg-slate-900/60 p-4 transition hover:border-amber-300/60 hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="mt-1 text-xs text-slate-300">{item.desc}</div>
                    </div>
                    <span className="rounded-full bg-amber-300/20 px-2 py-1 text-xs font-semibold text-amber-100">
                      {item.price}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center rounded-lg bg-amber-400 px-3 py-2 text-xs font-bold text-slate-900 group-hover:bg-amber-300">
                    구매 링크 열기
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-amber-50/80">
              * 제휴 링크가 적용될 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">전기요금 상세 가이드</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/원룸-전기세-계산기"
              className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm font-medium text-slate-100 hover:border-cyan-300/60 hover:text-cyan-200"
            >
              원룸 전기세 계산기
            </Link>
            <Link
              href="/전기히터-전기세-계산기"
              className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm font-medium text-slate-100 hover:border-cyan-300/60 hover:text-cyan-200"
            >
              전기히터 전기세 계산기
            </Link>
            <Link
              href="/전기장판-전기요금"
              className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm font-medium text-slate-100 hover:border-cyan-300/60 hover:text-cyan-200"
            >
              전기장판 전기요금
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">자주 묻는 질문</h2>
          <div className="mt-4 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
          <div className="text-sm text-slate-400">Google AdSense 광고 영역</div>
          <div className="mt-1 text-xs text-slate-500">
            네이티브 광고는 이 구간에 자동 노출됩니다.
          </div>
        </div>

        <footer className="mt-10 space-y-1 text-center text-xs text-slate-400">
          <div>요금 계산은 한국전력 주거용 저압 요금표(2024년 기준)를 따릅니다.</div>
          <div>실제 청구 금액과 일부 차이가 있을 수 있습니다.</div>
          <div className="mt-3 text-slate-500">
            © 2026 자취전기세 계산기 | 문의: contact@example.com
          </div>
        </footer>
      </section>
    </main>
  );
}
