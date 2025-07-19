/**
 *
 * @param key
 * @param value
 * @param rootObject
 * @returns
 */
export function valueMapper(rootObject: Record<string, any>, key: string, value: any) {
  const regex = /[^.[\]]+/g;
  const tokens = key.match(regex) || [];

  let current = rootObject;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];
    const isLast = i === tokens.length - 1;

    if (isLast) {
      current[token] = value;
      return;
    }

    // Determine if the next token is a number => array
    const nextIsArrayIndex = nextToken && !isNaN(Number(nextToken));

    if (!current[token]) {
      current[token] = nextIsArrayIndex ? [] : {};
    }

    current = current[token];
  }
}

export function getValueByPath(obj: Record<string, any>, path: string): string {
  if (!obj || typeof path !== 'string') return '';

  const parts = path.replace(/\[(\w+)\]/g, '.$1').split('.');

  let current: any = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return '';
    }
  }
  return current;
}
