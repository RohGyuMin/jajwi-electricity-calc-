/**
 * 한국전력 주거용 저압 누진세 요금 계산 (2024년 기준)
 */

export type TierInfo = {
  tier: 1 | 2 | 3;
  tierName: string;
  range: string;
  baseRate: number; // 기본요금
  unitRate: number; // 전력량 요금 (원/kWh)
};

// 누진 단계별 정보
export const TIERS: TierInfo[] = [
  {
    tier: 1,
    tierName: "1단계",
    range: "0~200kWh",
    baseRate: 910,
    unitRate: 112.0,
  },
  {
    tier: 2,
    tierName: "2단계",
    range: "201~400kWh",
    baseRate: 1600,
    unitRate: 206.6,
  },
  {
    tier: 3,
    tierName: "3단계",
    range: "400kWh 초과",
    baseRate: 7300,
    unitRate: 299.3,
  },
];

export type ElectricityBill = {
  usage: number; // 사용량 (kWh)
  tier: TierInfo; // 현재 누진 단계
  baseCharge: number; // 기본요금
  energyCharge: number; // 전력량 요금
  subtotal: number; // 전기요금 계 (기본+전력량)
  vat: number; // 부가가치세 (10%)
  fundCharge: number; // 전력산업기반기금 (3.7%)
  total: number; // 최종 청구액
  nextTierRemaining: number | null; // 다음 단계까지 남은 kWh (마지막 단계는 null)
};

/**
 * 사용량에 따른 누진 단계 결정
 */
export function getTier(usage: number): TierInfo {
  if (usage <= 200) return TIERS[0];
  if (usage <= 400) return TIERS[1];
  return TIERS[2];
}

/**
 * 전력량 요금 계산 (누진 구간별 합산)
 */
function calculateEnergyCharge(usage: number): number {
  let charge = 0;

  if (usage <= 200) {
    // 1단계만
    charge = usage * TIERS[0].unitRate;
  } else if (usage <= 400) {
    // 1단계 + 2단계
    charge = 200 * TIERS[0].unitRate + (usage - 200) * TIERS[1].unitRate;
  } else {
    // 1단계 + 2단계 + 3단계
    charge =
      200 * TIERS[0].unitRate +
      200 * TIERS[1].unitRate +
      (usage - 400) * TIERS[2].unitRate;
  }

  return charge;
}

/**
 * 전기요금 계산 (한국전력 공식)
 */
export function calculateBill(usage: number): ElectricityBill {
  const tier = getTier(usage);
  const baseCharge = tier.baseRate;
  const energyCharge = calculateEnergyCharge(usage);
  const subtotal = baseCharge + energyCharge;

  // 부가가치세 (10%)
  const vat = Math.floor(subtotal * 0.1);

  // 전력산업기반기금 (3.7%)
  const fundCharge = Math.floor(subtotal * 0.037);

  // 최종 청구액 (10원 미만 절사)
  const rawTotal = subtotal + vat + fundCharge;
  const total = Math.floor(rawTotal / 10) * 10;

  // 다음 단계까지 남은 사용량
  let nextTierRemaining: number | null = null;
  if (usage <= 200) {
    nextTierRemaining = 200 - usage;
  } else if (usage <= 400) {
    nextTierRemaining = 400 - usage;
  }

  return {
    usage,
    tier,
    baseCharge,
    energyCharge,
    subtotal,
    vat,
    fundCharge,
    total,
    nextTierRemaining,
  };
}

/**
 * 절약 효과 계산 (사용량 감소 시 절감액)
 */
export function calculateSavings(
  currentUsage: number,
  reducedUsage: number
): number {
  const currentBill = calculateBill(currentUsage);
  const reducedBill = calculateBill(reducedUsage);
  return currentBill.total - reducedBill.total;
}
