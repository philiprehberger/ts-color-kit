# @philiprehberger/color-kit

[![CI](https://github.com/philiprehberger/ts-color-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-color-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/color-kit.svg)](https://www.npmjs.com/package/@philiprehberger/color-kit)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-color-kit)](https://github.com/philiprehberger/ts-color-kit/commits/main)

Lightweight color parsing, conversion, and manipulation

## Installation

```bash
npm install @philiprehberger/color-kit
```

## Usage

```ts
import { color } from '@philiprehberger/color-kit';

const c = color('#3b82f6');
c.lighten(20).toHex();       // lighter blue
c.opacity(0.5).toRGB();      // "rgba(59, 130, 246, 0.5)"
c.contrast(color('#ffffff')); // WCAG contrast ratio
c.isDark();                   // true
c.mix(color('#ef4444'), 0.5); // blended color
```

### Color Harmonies

```ts
color('#3b82f6').complementary(); // [Color]
color('#3b82f6').analogous();     // [Color, Color]
color('#3b82f6').triadic();       // [Color, Color]
```

## API

| Method | Description |
|--------|-------------|
| `color(input)` | Parse hex, rgb(), hsl(), or named color |
| `.toHex()` / `.toRGB()` / `.toHSL()` / `.toHSB()` | Convert |
| `.lighten(n)` / `.darken(n)` | Adjust lightness |
| `.saturate(n)` / `.desaturate(n)` | Adjust saturation |
| `.opacity(a)` / `.invert()` / `.grayscale()` | Transform |
| `.mix(other, ratio)` | Blend two colors |
| `.contrast(other)` | WCAG 2.1 contrast ratio |
| `.isLight()` / `.isDark()` | Luminance check |
| `.complementary()` / `.analogous()` / `.triadic()` | Harmonies |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-color-kit)

🐛 [Report issues](https://github.com/philiprehberger/ts-color-kit/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-color-kit/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
