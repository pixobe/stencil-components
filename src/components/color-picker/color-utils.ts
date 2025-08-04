export const strToRGBA = (str: string): { r: number; g: number; b: number; a: number } => {
  // Default color if parsing fails
  let rgba = { r: 0, g: 0, b: 0, a: 1 };

  // Try to parse as hex
  if (str.startsWith('#')) {
    let hex = str.substring(1);

    // Convert shorthand hex (#RGB) to full hex (#RRGGBB)
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
    let a = 1;
    if (hex.length === 8) {
      a = parseInt(hex.substring(6, 8), 16) / 255;
    }

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      rgba = { r, g, b, a };
    }
  }
  // Try to parse as rgb/rgba
  else if (str.startsWith('rgb')) {
    const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
    if (match) {
      rgba = {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
        a: match[4] ? parseFloat(match[4]) : 1,
      };
    }
  }
  // Try to parse as hsl/hsla
  else if (str.startsWith('hsl')) {
    const match = str.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*(\d*\.?\d+))?\)/);
    if (match) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10) / 100;
      const l = parseInt(match[3], 10) / 100;
      const a = match[4] ? parseFloat(match[4]) : 1;

      // Convert HSL to RGB
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;

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

      rgba = {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
        a: a,
      };
    }
  }

  return rgba;
};

export const RGBAtoHSVA = (rgba: { r: number; g: number; b: number; a: number }): { h: number; s: number; v: number; a: number } => {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = max === 0 ? 0 : delta / max;
  const v = max;

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
    v: Math.round(v * 100),
    a: rgba.a,
  };
};

export const HSVAtoRGBA = (hsva: { h: number; s: number; v: number; a: number }): { r: number; g: number; b: number; a: number } => {
  const h = hsva.h;
  const s = hsva.s / 100;
  const v = hsva.v / 100;

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
    a: hsva.a,
  };
};

export const RGBAToHex = (rgba: { r: number; g: number; b: number; a: number }): string => {
  let r = rgba.r.toString(16);
  let g = rgba.g.toString(16);
  let b = rgba.b.toString(16);
  let a = '';

  if (rgba.r < 16) r = '0' + r;
  if (rgba.g < 16) g = '0' + g;
  if (rgba.b < 16) b = '0' + b;

  // Add alpha if it's not 1
  if (rgba.a < 1) {
    const alpha = Math.round(rgba.a * 255);
    a = alpha.toString(16);
    if (alpha < 16) a = '0' + a;
  }

  return '#' + r + g + b + a;
};
