import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "원룸 전기세 계산기 | 1인 가구 월 전기요금 빠르게 확인",
  description:
    "원룸 전기세 계산기로 월 사용량(kWh) 기준 예상 청구액과 누진구간을 간단히 확인하세요. 자취 전기세, 원룸 전기요금 키워드 중심으로 실제 생활에 맞춘 절약 시뮬레이션도 함께 제공합니다.",
  keywords: [
    "원룸 전기세 계산기",
    "자취 전기세",
    "원룸 전기요금",
    "1인 가구 전기요금",
  ],
};

export default function OneRoomElectricityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">원룸 전기세 계산기</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          원룸에 혼자 살면 월 전기요금이 어느 정도 나올지 체감하기 어렵습니다. 특히
          여름 냉방이나 겨울 난방을 시작하면 사용량이 갑자기 늘고, 누진구간 때문에
          같은 10kWh라도 체감 요금이 달라집니다. 이 페이지는 자취 전기세와 원룸
          전기요금을 빠르게 가늠할 수 있도록 핵심 포인트만 정리한 안내 페이지입니다.
          아래 메인 계산기에서 사용량을 입력하면 예상 청구액, 구간 변화, 절약 효과를
          바로 확인할 수 있습니다.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">자주 묻는 질문</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                원룸 평균 사용량은 보통 어느 정도인가요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                계절과 가전 사용 패턴에 따라 다르지만 대체로 150~250kWh 범위가
                많고, 냉난방을 오래 사용하면 300kWh 이상으로 올라갈 수 있습니다.
              </p>
            </details>
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                왜 갑자기 요금이 크게 오르나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                사용량이 특정 구간을 넘으면 kWh당 단가가 높아지는 누진 구조가
                적용됩니다. 구간 경계 근처에서는 작은 사용량 증가도 요금 체감이
                크게 느껴질 수 있습니다.
              </p>
            </details>
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                실제 고지서와 완전히 같게 계산되나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                본 계산기는 참고용입니다. 계약 유형, 복지 할인, 계절 요금, 기타
                항목에 따라 실제 청구액과 차이가 날 수 있습니다.
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
