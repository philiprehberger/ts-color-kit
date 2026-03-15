import type { RGB } from './types';
import { rgbToHsl } from './convert';

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h / 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

function modifyHsl(rgb: RGB, fn: (h: number, s: number, l: number) => { h: number; s: number; l: number }): RGB {
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const modified = fn(h, s, l);
  const result = hslToRgb(modified.h, modified.s, modified.l);
  return { ...result, a: rgb.a };
}

export function lighten(rgb: RGB, amount: number): RGB {
  return modifyHsl(rgb, (h, s, l) => ({ h, s, l: Math.min(1, l + amount / 100) }));
}

export function darken(rgb: RGB, amount: number): RGB {
  return modifyHsl(rgb, (h, s, l) => ({ h, s, l: Math.max(0, l - amount / 100) }));
}

export function saturate(rgb: RGB, amount: number): RGB {
  return modifyHsl(rgb, (h, s, l) => ({ h, s: Math.min(1, s + amount / 100), l }));
}

export function desaturate(rgb: RGB, amount: number): RGB {
  return modifyHsl(rgb, (h, s, l) => ({ h, s: Math.max(0, s - amount / 100), l }));
}

export function setOpacity(rgb: RGB, a: number): RGB {
  return { ...rgb, a: Math.max(0, Math.min(1, a)) };
}

export function invert(rgb: RGB): RGB {
  return { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b, a: rgb.a };
}

export function grayscale(rgb: RGB): RGB {
  const gray = Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
  return { r: gray, g: gray, b: gray, a: rgb.a };
}
