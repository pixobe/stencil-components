export function ensureJsonObject(value: string | object): any {
  // 1. Check if the value is a string
  let parsedValue = value;
  if (typeof value === 'string') {
    try {
      // 2. Attempt to parse the string
      parsedValue = JSON.parse(value);
    } catch (error) {
      // 4. Handle exceptions
      console.warn('Failed to parse this.value as JSON. Keeping original string.', error);
      // Logic continues with the original string value intact
    }
  }
  return parsedValue;
}
