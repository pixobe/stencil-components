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
