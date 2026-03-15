import type { RGB } from './types';

export function mix(c1: RGB, c2: RGB, ratio: number = 0.5): RGB {
  const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
  const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
  const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
  const a = c1.a + (c2.a - c1.a) * ratio;
  return { r, g, b, a };
}
