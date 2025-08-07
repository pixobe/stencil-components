// --- Types ---
export interface ColorInfo {
  hsl: HSL;
  hsla: HSLA;
  rgb: RGB;
  rgba: RGBA;
  hex: string;
  cssColor: string;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLA extends HSL {
  a: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface ColorPosition {
  x: number;
  y?: number;
}

export type ColorInput = string | RGB | RGBA | HSL | HSLA;

// --- Color Conversions ---
export function HEXtoRGB(hex: string): RGB {
  hex = hex.replace(/^#/, ''); // remove '#'

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if ([r, g, b].some(c => isNaN(c))) {
    return { r: 0, g: 0, b: 0 };
  }

  return { r, g, b };
}

export function RGBtoHSL({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }

  h = (h / 6) * 360;

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function HSLtoRGB({ h, s, l }: HSL): RGB {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function RGBToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map(val => val.toString(16).padStart(2, '0')).join('');
}

// --- Color Class ---
export class Color {
  a: number;
  private _hex: string;
  private _rgb: RGB;
  private _hsl: HSL;

  constructor(color: { hex?: string; rgb?: RGB; hsl?: HSL; a: number }) {
    this.a = color.a;

    if (color.hex) {
      this._hex = color.hex;
      this._rgb = HEXtoRGB(color.hex);
      this._hsl = RGBtoHSL(this._rgb);
    } else if (color.rgb) {
      this._rgb = color.rgb;
      this._hex = RGBToHex(color.rgb);
      this._hsl = RGBtoHSL(color.rgb);
    } else if (color.hsl) {
      this._hsl = color.hsl;
      this._rgb = HSLtoRGB(color.hsl);
      this._hex = RGBToHex(this._rgb);
    } else {
      throw new Error('Invalid color input');
    }
  }

  get rgb(): RGB {
    return this._rgb;
  }

  get hsl(): HSL {
    return this._hsl;
  }

  get hex(): string {
    return this._hex;
  }

  get hsla(): string {
    const { h, s, l } = this._hsl;
    return `hsla(${h}, ${s}%, ${l}%, ${this.a})`;
  }

  get rgba(): string {
    const { r, g, b } = this._rgb;
    return `rgba(${r}, ${g}, ${b}, ${this.a})`;
  }

  get hexa(): string {
    const alphaHex = Math.round(this.a * 255)
      .toString(16)
      .padStart(2, '0');
    return `${this.hex}${alphaHex}`;
  }
}
