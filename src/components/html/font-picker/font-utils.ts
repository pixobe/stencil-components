// src/utils/fontLoader.ts

export interface FontItem {
  name: string;
  url: string;
}

export const defaultFont = {
  name: 'Times New Roman',
};

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export async function fontLoader(font: FontItem): Promise<string> {
  const TIMEOUT_MS = 5000;

  const timeoutPromise = new Promise<string>((_, reject) => {
    setTimeout(() => reject(new Error(`Font loading timed out: ${font.name}`)), TIMEOUT_MS);
  });

  try {
    const loadPromise = isValidUrl(font.url) ? loadWebFont(font) : loadSystemFont(font);
    return await Promise.race([loadPromise, timeoutPromise]);
  } catch (error) {
    console.error(`Error loading font "${font.name}":`, error);
    return font.name;
  }
}

async function loadWebFont(font: FontItem): Promise<string> {
  try {
    const face = new FontFace(font.name, `url(${font.url})`);
    await face.load();
    document.fonts.add(face);
    return font.name;
  } catch (error) {
    console.error(`Failed to load font: ${font.name}`, error);
    throw error; // Re-throw the error if needed
  }
}

async function loadSystemFont(font: FontItem): Promise<string> {
  if (await isFontAvailable(font.name)) {
    return font.name;
  }

  try {
    await document.fonts.load(`14px "${font.name}"`);
    return (await isFontAvailable(font.name)) ? font.name : defaultFont.name;
  } catch (error) {
    console.warn(`Failed to load system font "${font.name}":`, error);
    return defaultFont.name;
  }
}

async function isFontAvailable(name: string): Promise<boolean> {
  await document.fonts.ready;
  return document.fonts.check(`14px "${name}"`);
}
