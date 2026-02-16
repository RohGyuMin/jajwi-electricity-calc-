import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "전기장판 전기요금 | 원룸 난방비 계산 전 체크 포인트",
  description:
    "전기장판 전기요금이 궁금할 때 확인할 수 있는 안내 페이지입니다. 히터 대비 저전력인 경우가 많지만 사용 시간과 설정 온도에 따라 월 전기요금 차이가 크게 날 수 있어, 자취 전기세 계산기로 함께 점검하는 것이 좋습니다.",
  keywords: [
    "전기장판 전기요금",
    "전기장판 전기세",
    "자취 전기세",
    "원룸 전기요금",
  ],
};

export default function ElectricMatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">전기장판 전기요금</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          전기장판은 겨울철 원룸에서 가장 많이 쓰는 난방 보조 기기 중 하나입니다.
          보통 전기히터보다 소비전력이 낮아 부담이 적다고 알려져 있지만, 밤새 높은
          단계로 사용하거나 여러 기기를 동시에 쓰면 월 전기요금이 빠르게 올라갈 수
          있습니다. 결국 중요한 것은 기기 종류보다 월 누적 사용량(kWh)입니다. 이
          페이지에서 전기장판 사용 시 체크 포인트를 확인하고, 아래 계산기로 자취
          전기세와 원룸 전기요금을 실제 숫자로 비교해보세요.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">자주 묻는 질문</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                전기장판은 무조건 전기요금이 적게 나오나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                대부분 저전력이지만 사용 시간, 온도 설정, 동시 사용 가전에 따라
                최종 요금은 달라집니다. 월 전체 사용량 기준으로 보는 것이 정확합니다.
              </p>
            </details>
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                타이머를 쓰면 얼마나 도움이 되나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                취침 후 자동으로 전원을 낮추거나 끄면 누적 사용량을 줄이는 데
                효과적입니다. 특히 난방 사용이 집중되는 겨울철에 체감이 큽니다.
              </p>
            </details>
            <details className="rounded-lg bg-slate-50 p-3">
              <summary className="cursor-pointer font-medium">
                어느 구간부터 요금 부담이 커지나요?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                월 사용량이 높아질수록 단가가 올라가는 구조라, 구간 경계 근처에서는
                작은 사용량 증가도 요금 차이가 크게 나타날 수 있습니다.
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
