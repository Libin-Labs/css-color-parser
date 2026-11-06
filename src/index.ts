export interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}
export function parseCssColor(input: string): RGB {
  if (typeof input !== 'string' || input.length > 64)
    throw new TypeError('Expected short CSS color text');
  const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(input);
  if (hex) {
    let h = hex[1]!;
    if (h.length === 3) h = [...h].map((c) => c + c).join('');
    return {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
    };
  }
  const rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.exec(input);
  if (!rgb) throw new TypeError('Unsupported CSS color syntax');
  const values = rgb.slice(1).map(Number);
  if (values.some((v) => v > 255)) throw new RangeError('RGB byte outside [0,255]');
  return { r: values[0]! / 255, g: values[1]! / 255, b: values[2]! / 255 };
}
