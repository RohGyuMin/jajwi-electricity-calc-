"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculateBill, calculateSavings } from "@/lib/electricity";

const PRODUCT_ITEMS = [
  {
    name: "문풍지 (접착식)",
    desc: "틈새 바람을 줄여 난방비 절감에 도움",
    price: "실시간 가격",
    href: "https://www.coupang.com/vp/products/8397270131?itemId=24271998324&vendorItemId=93672795991&src=1139000&spec=10799999&addtag=400&ctag=8397270131&lptag=AF4794871&itime=20260217010640&pageType=PRODUCT&pageValue=8397270131&wPcid=17682023452395667593736&wRef=&wTime=20260217010640&redirect=landing&traceid=V0-181-71917c5bd76b4958&mcid=a5390f10b62f479db30ebbfdda81d46a&campaignid=&clickBeacon=&imgsize=&pageid=&sig=&subid=&campaigntype=&puid=&ctime=&portal=&landing_exp=&placementid=&puidType=&contentcategory=&tsource=&deviceid=&contenttype=&token=&impressionid=&requestid=&contentkeyword=&offerId=&sfId=&subparam=",
  },
  {
    name: "단열 커튼",
    desc: "실내 열손실 감소, 체감온도 유지",
    price: "실시간 가격",
    href: "https://www.coupang.com/vp/products/8729454920?itemId=25363114712&vendorItemId=92357370321&src=1139000&spec=10799999&addtag=400&ctag=8729454920&lptag=AF4794871&itime=20260217010511&pageType=PRODUCT&pageValue=8729454920&wPcid=17682023452395667593736&wRef=&wTime=20260217010511&redirect=landing&traceid=V0-181-b73ce73b194683a2&mcid=b517b7c426114e31ba71602342c9597d&campaignid=&clickBeacon=&imgsize=&pageid=&sig=&subid=&campaigntype=&puid=&ctime=&portal=&landing_exp=&placementid=&puidType=&contentcategory=&tsource=&deviceid=&contenttype=&token=&impressionid=&requestid=&contentkeyword=&offerId=&sfId=&subparam=",
  },
  {
    name: "전기장판",
    desc: "저전력 보조 난방으로 비용 절감",
    price: "40,000원대",
    href: "https://www.coupang.com/np/search?q=%EC%A0%84%EA%B8%B0%EC%9E%A5%ED%8C%90",
  },
  {
    name: "타이머 콘센트",
    desc: "자동 ON/OFF로 사용시간 관리",
    price: "10,000원대",
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

const ONE_ROOM_AVERAGE_USAGE = 220;
const HISTORY_KEY = "electricity-history-v1";
const MAX_HISTORY = 5;

type UsageHistory = {
  usage: number;
  total: number;
  savedAt: string;
};

export default function Home() {
  const [usage, setUsage] = useState(250);
  const [reduceAmount, setReduceAmount] = useState(30);
  const [history, setHistory] = useState<UsageHistory[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as UsageHistory[];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) =>
          typeof item?.usage === "number" &&
          typeof item?.total === "number" &&
          typeof item?.savedAt === "string"
      );
    } catch {
      return [];
    }
  });

  const safeUsage = Math.max(0, usage || 0);
  const reducedUsage = Math.max(0, safeUsage - reduceAmount);
  const bill = calculateBill(safeUsage);
  const reducedBill = calculateBill(reducedUsage);
  const savings = calculateSavings(safeUsage, reducedUsage);
  const savingsRate = bill.total > 0 ? Math.round((savings / bill.total) * 100) : 0;
  const usageGap = safeUsage - ONE_ROOM_AVERAGE_USAGE;
  const usageGapRate = Math.round(
    (Math.abs(usageGap) / ONE_ROOM_AVERAGE_USAGE) * 100
  );

  const saveCurrentRecord = () => {
    const record: UsageHistory = {
      usage: safeUsage,
      total: bill.total,
      savedAt: new Date().toISOString(),
    };
    const deduped = history.filter(
      (item) => !(item.usage === record.usage && item.total === record.total)
    );
    const next = [record, ...deduped].slice(0, MAX_HISTORY);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const chartData = useMemo(() => history.slice().reverse(), [history]);
  const chartStats = useMemo(() => {
    if (!chartData.length) return null;
    const totals = chartData.map((item) => item.total);
    return {
      min: Math.min(...totals),
      max: Math.max(...totals),
    };
  }, [chartData]);

  const chartPoints = useMemo(() => {
    if (!chartStats || chartData.length === 0) return "";
    const width = 360;
    const height = 180;
    const padding = 20;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;
    return chartData
      .map((item, index) => {
        const x =
          chartData.length === 1
            ? width / 2
            : padding + (index / (chartData.length - 1)) * usableWidth;
        const yRatio =
          chartStats.max === chartStats.min
            ? 0.5
            : (item.total - chartStats.min) / (chartStats.max - chartStats.min);
        const y = padding + (1 - yRatio) * usableHeight;
        return `${x},${y}`;
      })
      .join(" ");
  }, [chartData, chartStats]);

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
      ? "text-sky-700 bg-sky-50"
      : bill.tier.tier === 2
      ? "text-blue-700 bg-blue-50"
      : "text-indigo-700 bg-indigo-50";

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="sticky top-3 z-20 mb-6 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-sm backdrop-blur">
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
            <div className="hidden text-xs font-semibold text-slate-500 sm:block">
              전기요금 빠른 메뉴
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="#calculator"
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                계산기
              </a>
              <a
                href="#usage-tier"
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                누진구간
              </a>
              <a
                href="#saving-tips"
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                절약팁
              </a>
              <a
                href="#faq"
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                FAQ
              </a>
            </div>
          </nav>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            id="calculator"
            className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
              원룸 전기요금 빠른 계산
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              자취 전기세 계산기
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              고지서 확인 전 예상 요금을 먼저 확인하세요. 사용량(kWh) 입력만으로
              누진구간, 예상 청구액, 절약 가능 금액을 빠르게 확인할 수 있습니다.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <label className="block w-full overflow-hidden">
                <span className="text-sm font-semibold text-slate-700">월간 전기 사용량</span>
                <div className="mt-2 flex w-full items-center gap-3 overflow-hidden">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    className="flex-1 w-full max-w-full box-border rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold text-slate-900 focus:border-sky-500 focus:outline-none"
                    value={usage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setUsage(Number.isNaN(val) ? 0 : Math.max(0, val));
                    }}
                  />
                  <span className="text-lg font-semibold text-slate-500">kWh</span>
                </div>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {[180, 250, 320].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setUsage(preset)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-sky-400 hover:text-sky-700"
                  >
                    {preset}kWh
                  </button>
                ))}
              </div>
              <div
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  usageGap > 0
                    ? "bg-indigo-100 text-indigo-700"
                    : usageGap < 0
                    ? "bg-sky-100 text-sky-700"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                원룸 평균(220kWh) 대비{" "}
                {usageGap === 0
                  ? "동일"
                  : `${usageGap > 0 ? "+" : "-"}${Math.abs(usageGap)}kWh (${usageGapRate}%)`}
              </div>
              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-xs font-semibold text-slate-700">kWh 확인 방법</div>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  한전ON 앱, 한전 사이버지점, 전기요금 고지서에서 월 사용량(kWh)을 확인할 수 있습니다.
                </p>
                <a
                  href="https://cyber.kepco.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  한전에서 사용량 확인
                </a>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={saveCurrentRecord}
                  className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
                >
                  현재 값 기록 저장
                </button>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    기록 초기화
                  </button>
                )}
              </div>
              {history.length > 0 && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                  <div className="text-xs font-semibold text-slate-700">
                    최근 저장 기록 ({history.length}/{MAX_HISTORY})
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    {history.map((item) => (
                      <div
                        key={`${item.savedAt}-${item.usage}-${item.total}`}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1"
                      >
                        <span>{item.usage}kWh</span>
                        <span className="font-semibold text-slate-800">
                          {item.total.toLocaleString()}원
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-slate-300 bg-gradient-to-br from-slate-700 to-slate-800 p-6 text-white shadow-lg">
            <div className="text-sm font-semibold text-slate-200">이번 달 예상 청구액</div>
            <div className="mt-1 break-all text-4xl leading-tight font-extrabold sm:text-5xl">
              {bill.total.toLocaleString()}
              <span className="ml-2 text-xl font-semibold sm:text-2xl">원</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
              <span className={`rounded-full px-2 py-0.5 ${tierColor} font-semibold`}>
                {bill.tier.tierName}
              </span>
              <span>{bill.tier.range}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="rounded-xl bg-white/12 p-3">
                <div className="text-slate-200">전력량 요금</div>
                <div className="mt-1 text-base font-bold text-white">
                  {Math.round(bill.energyCharge).toLocaleString()}원
                </div>
              </div>
              <div className="rounded-xl bg-white/12 p-3">
                <div className="text-slate-200">부가세 + 기금</div>
                <div className="mt-1 text-base font-bold text-white">
                  {(bill.vat + bill.fundCharge).toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="usage-tier" className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">누진구간 현황</h2>
            <div className="mt-4 relative h-8 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`absolute h-full transition-all duration-500 ${
                  bill.tier.tier === 1
                    ? "bg-sky-400"
                    : bill.tier.tier === 2
                    ? "bg-blue-500"
                    : "bg-indigo-500"
                }`}
                style={{ width: `${Math.min((safeUsage / 400) * 100, 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold text-slate-600">
                <span>0</span>
                <span>200</span>
                <span className="font-bold text-indigo-700">400+</span>
              </div>
            </div>
            {bill.nextTierRemaining !== null && (
              <div className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
                <span className="font-semibold">
                  다음 구간까지 {bill.nextTierRemaining.toFixed(0)}kWh 남음
                </span>
                <span className="ml-2">- 경계 전 사용량 관리가 중요합니다.</span>
              </div>
            )}
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
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                <span>총 청구액</span>
                <span>{bill.total.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-sky-900">절약 시뮬레이터</h2>
            <p className="mt-2 text-sm text-sky-800">
              절약 목표를 조절해 이번 달 절감 예상액을 확인하세요.
            </p>
            <label className="mt-4 block">
              <span className="text-sm font-medium text-sky-900">
                절약 목표: <b>{reduceAmount}kWh</b> 감소
              </span>
              <input
                type="range"
                min="0"
                max={Math.min(safeUsage, 100)}
                step="5"
                className="mt-2 w-full accent-sky-500"
                value={reduceAmount}
                onChange={(e) => setReduceAmount(Number(e.target.value))}
              />
            </label>
            <div className="mt-4 rounded-xl border border-sky-200 bg-white p-4 text-slate-900">
              <div className="text-sm font-medium text-sky-700">{reduceAmount}kWh 줄이면</div>
              <div className="mt-1 text-4xl font-extrabold text-sky-700">
                {savings.toLocaleString()}원
              </div>
              <div className="mt-2 text-sm text-slate-600">
                {safeUsage}kWh → {reducedUsage}kWh ({reducedBill.tier.tierName})
              </div>
              <div className="mt-2">
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
                  약 {savingsRate}% 절감
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="saving-tips" className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">겨울철 난방비 절약 팁</h2>
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
              ].map((tip) => (
                <div key={tip.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">{tip.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">절약 필수템</h2>
            <p className="mt-2 text-sm font-medium text-slate-700">
              이번 달 난방비 줄이기, 필요한 제품부터 바로 준비하세요.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              지금 확인하고 비교하면 다음 고지서에서 체감 차이가 납니다.
            </p>
            <div className="mt-4 grid gap-3">
              {PRODUCT_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.desc}</div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {item.price}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center rounded-lg bg-sky-600 px-3 py-2 text-xs font-bold text-white transition group-hover:bg-sky-700">
                    가성비 특가 바로 보기
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              본 섹션은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">지난 기록 비교 그래프</h2>
          <p className="mt-1 text-sm text-slate-600">
            최근 저장한 기록 기준으로 예상 전기요금 변화를 비교합니다.
          </p>
          {chartData.length >= 2 ? (
            <div className="mt-4">
              <svg
                viewBox="0 0 360 180"
                className="h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                role="img"
                aria-label="전기요금 비교 라인 그래프"
              >
                <polyline
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  points={chartPoints}
                />
                {chartPoints.split(" ").map((point) => {
                  const [cx, cy] = point.split(",");
                  return (
                    <circle
                      key={`${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill="#0369a1"
                    />
                  );
                })}
              </svg>
              <div className="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                {chartData.map((item, index) => (
                  <div
                    key={`${item.savedAt}-${item.total}-${index}`}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1"
                  >
                    <span>
                      {index + 1}차 · {item.usage}kWh
                    </span>
                    <span className="font-semibold text-slate-800">
                      {item.total.toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              비교 그래프를 보려면 기록을 2개 이상 저장해 주세요.
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">전기요금 상세 가이드</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/원룸-전기세-계산기"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              원룸 전기세 계산기
            </Link>
            <Link
              href="/전기히터-전기세-계산기"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              전기히터 전기세 계산기
            </Link>
            <Link
              href="/전기장판-전기요금"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              전기장판 전기요금
            </Link>
          </div>
        </div>

        <div id="faq" className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">자주 묻는 질문</h2>
          <div className="mt-4 space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div className="text-sm text-slate-400">Google AdSense 광고 영역</div>
          <div className="mt-1 text-xs text-slate-500">네이티브 광고는 이 구간에 자동 노출됩니다.</div>
        </div>

        <footer className="mt-10 space-y-1 text-center text-xs text-slate-500">
          <div>요금 계산은 한국전력 주거용 저압 요금표(2026년 2월 확인 기준)를 따릅니다.</div>
          <div>실제 청구 금액과 일부 차이가 있을 수 있습니다.</div>
          <div className="mt-3 text-slate-400">© 2026 자취전기세 계산기 | 문의: contact@example.com</div>
        </footer>
      </section>
    </main>
  );
}
