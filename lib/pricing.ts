// PLACEHOLDER coefficients — replace with supplier's real pricing instructions later.
export const CFG = {
  pricePerM3: { pilkas: 3200, juodas: 5200, rudas: 4400, marmuras: 3800 } as const,
  workMultiplier: 0.9,
  baseFee: 180,
};

export type StoneId = keyof typeof CFG.pricePerM3;

export function calcPrice({
  l,
  w,
  t,
  stone,
}: {
  l: number;
  w: number;
  t: number;
  stone: StoneId;
}): number {
  const m3 = (l / 100) * (w / 100) * (t / 100);
  const stoneCost = m3 * CFG.pricePerM3[stone];
  const total = stoneCost + stoneCost * CFG.workMultiplier + CFG.baseFee;
  return Math.round(total / 10) * 10;
}
