import type { RGB } from './types';
import { parseColor } from './parse';
import { toHex, toRGBString, toHSLString, rgbToHsb } from './convert';
import { lighten, darken, saturate, desaturate, setOpacity, invert, grayscale } from './manipulate';
import { mix } from './blend';
import { contrastRatio, isLight, isDark } from './contrast';
import { complementary, analogous, triadic, splitComplementary } from './harmony';

export class Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;

  constructor(rgb: RGB) {
    this.r = rgb.r; this.g = rgb.g; this.b = rgb.b; this.a = rgb.a;
  }

  private get rgb(): RGB { return { r: this.r, g: this.g, b: this.b, a: this.a }; }

  toHex(): string { return toHex(this.rgb); }
  toRGB(): string { return toRGBString(this.rgb); }
  toHSL(): string { return toHSLString(this.rgb); }
  toHSB(): { h: number; s: number; b: number } { return rgbToHsb(this.r, this.g, this.b); }

  lighten(amount: number): Color { return new Color(lighten(this.rgb, amount)); }
  darken(amount: number): Color { return new Color(darken(this.rgb, amount)); }
  saturate(amount: number): Color { return new Color(saturate(this.rgb, amount)); }
  desaturate(amount: number): Color { return new Color(desaturate(this.rgb, amount)); }
  opacity(a: number): Color { return new Color(setOpacity(this.rgb, a)); }
  invert(): Color { return new Color(invert(this.rgb)); }
  grayscale(): Color { return new Color(grayscale(this.rgb)); }

  mix(other: Color, ratio?: number): Color { return new Color(mix(this.rgb, other.rgb, ratio)); }
  contrast(other: Color | string): number {
    const otherRgb = other instanceof Color ? other.rgb : parseColor(other);
    return Math.round(contrastRatio(this.rgb, otherRgb) * 100) / 100;
  }
  isLight(): boolean { return isLight(this.rgb); }
  isDark(): boolean { return isDark(this.rgb); }

  complementary(): Color[] { return complementary(this.rgb).map((c) => new Color(c)); }
  analogous(): Color[] { return analogous(this.rgb).map((c) => new Color(c)); }
  triadic(): Color[] { return triadic(this.rgb).map((c) => new Color(c)); }
  splitComplementary(): Color[] { return splitComplementary(this.rgb).map((c) => new Color(c)); }
}

export function color(input: string): Color {
  return new Color(parseColor(input));
}
