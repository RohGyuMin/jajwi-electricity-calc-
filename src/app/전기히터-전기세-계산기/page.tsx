import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "전기히터 전기세 계산기 | 난방 사용량 기준 전기요금 확인",
  description:
    "전기히터 전기세 계산기 안내 페이지입니다. 난방 시간을 늘릴수록 사용량이 빠르게 증가해 누진구간에 진입할 수 있으므로, 자취 전기세와 원룸 전기요금 관점에서 월 예상 요금을 미리 확인해보세요.",
  keywords: [
    "전기히터 전기세 계산기",
    "히터 전기요금",
    "자취 전기세",
    "원룸 전기요금",
  ],
};

export default function ElectricHeaterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">전기히터 전기세 계산기</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          전기히터는 빠르게 따뜻해지는 장점이 있지만 소비전력이 큰 편이라 하루
          사용 시간이 늘어나면 월 전기요금이 예상보다 빠르게 커질 수 있습니다.
          특히 추운 날씨에 장시간 켜두면 누진구간이 바뀌면서 요금 상승 폭이 더 크게
          느껴집니다. 이 페이지는 히터 사용 전 자취 전기세와 원룸 전기요금을 미리
          가늠하기 위한 핵심 가이드입니다. 아래 계산기에서 월 사용량을 입력하고
          이번 달 예상요금과 절약 가능 금액을 함께 확인해보세요.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">자주 묻는 질문</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                히터를 하루 2시간만 줄여도 효과가 있나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                네. 고출력 기기 특성상 사용 시간 단축 효과가 큰 편입니다. 이미
                누진구간 경계 근처라면 절감 체감이 더 커질 수 있습니다.
              </p>
            </details>
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                전기장판보다 히터가 더 비싼가요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                일반적으로 히터의 소비전력이 더 높아 같은 시간 사용 시 전기요금
                부담이 큰 경우가 많습니다. 다만 제품 스펙과 사용 습관에 따라 달라질
                수 있습니다.
              </p>
            </details>
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                월 사용량은 어디서 확인하나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                한전 앱, 사이버지점, 전기요금 고지서에서 kWh 값을 확인할 수 있으며
                그 숫자를 계산기에 입력하면 됩니다.
              </p>
            </details>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            메인 계산기로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
