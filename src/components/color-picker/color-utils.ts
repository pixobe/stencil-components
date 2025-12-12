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

export const RGBtoHSV = (rgb: RGB): HSL => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = max === 0 ? 0 : delta / max;
  const l = max;

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export function HEXtoRGB(hex: string): RGB {
  // Remove leading '#' if present
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Parse alpha if present (#RRGGBBAA)
  // let a = 1;
  // if (hex.length === 8) {
  //   a = parseInt(hex.substring(6, 8), 16) / 255;
  // }

  if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
    return { r, g, b };
  }

  return { r: 0, g: 0, b: 0 };
}

function RGBtoHSL({ r, g, b }: { r: number; g: number; b: number }): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

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
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export const HSLtoRGB = (hsv: HSL): RGB => {
  const h = hsv.h;
  const s = hsv.s / 100;
  const v = hsv.l / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

export const RGBToHex = (rgba: { r: number; g: number; b: number }): string => {
  let r = rgba.r.toString(16);
  let g = rgba.g.toString(16);
  let b = rgba.b.toString(16);

  if (rgba.r < 16) r = '0' + r;
  if (rgba.g < 16) g = '0' + g;
  if (rgba.b < 16) b = '0' + b;

  return '#' + r + g + b;
};

/**
 *
 */
export class Color {
  a: number;
  private _hex: string;
  private _rgb: RGB;
  private _hsl: HSL;

  constructor(color: { hex?: string; rgb?: RGB; hsl?: HSL; a: number } = { a: 1, hex: '#000000' }) {
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
    const h = this.hsl.h;
    const s = this.hsl.s;
    const l = this.hsl.l;
    return `hsla(${h}, ${s}%, ${l}%, ${this.a})`;
  }

  get rgba(): string {
    const { r, g, b } = this.rgb;
    return `rgba(${r}, ${g}, ${b}, ${this.a})`;
  }

  get hexa(): string {
    const alpha = Math.round(this.a * 255)
      .toString(16)
      .padStart(2, '0');
    return `${this.hex}${alpha}`;
  }
}
