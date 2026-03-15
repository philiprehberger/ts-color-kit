import type { RGB } from './types';
import { rgbToHsl } from './convert';

function hslToRgb(h: number, s: number, l: number, a: number): RGB {
  h = ((h % 360) + 360) % 360;
  const hNorm = h / 360;
  const am = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + hNorm * 12) % 12;
    return l - am * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255), a };
}

function rotateHue(rgb: RGB, degrees: number): RGB {
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hslToRgb(h + degrees, s, l, rgb.a);
}

export function complementary(rgb: RGB): RGB[] {
  return [rotateHue(rgb, 180)];
}

export function analogous(rgb: RGB): RGB[] {
  return [rotateHue(rgb, -30), rotateHue(rgb, 30)];
}

export function triadic(rgb: RGB): RGB[] {
  return [rotateHue(rgb, 120), rotateHue(rgb, 240)];
}

export function splitComplementary(rgb: RGB): RGB[] {
  return [rotateHue(rgb, 150), rotateHue(rgb, 210)];
}
