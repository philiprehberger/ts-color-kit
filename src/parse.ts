import type { RGB } from './types';

const NAMED_COLORS: Record<string, string> = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000',
  blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff',
  orange: '#ffa500', purple: '#800080', pink: '#ffc0cb', gray: '#808080',
  grey: '#808080', silver: '#c0c0c0', maroon: '#800000', olive: '#808000',
  lime: '#00ff00', teal: '#008080', navy: '#000080', aqua: '#00ffff',
};

function parseHex(hex: string): RGB | null {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length === 4) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];

  if (h.length === 6) {
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  if (h.length === 8) {
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: parseInt(h.slice(6, 8), 16) / 255 };
  }
  return null;
}

const RGB_RE = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/;
const HSL_RE = /^hsla?\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)$/;

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h / 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

export function parseColor(input: string): RGB {
  const trimmed = input.trim().toLowerCase();

  if (NAMED_COLORS[trimmed]) {
    return parseHex(NAMED_COLORS[trimmed])!;
  }

  if (trimmed.startsWith('#')) {
    const result = parseHex(trimmed);
    if (result) return result;
  }

  const rgbMatch = trimmed.match(RGB_RE);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10), g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10), a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
    };
  }

  const hslMatch = trimmed.match(HSL_RE);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    const rgb = hslToRgb(h, s, l);
    return { ...rgb, a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1 };
  }

  throw new Error(`Invalid color: "${input}"`);
}
