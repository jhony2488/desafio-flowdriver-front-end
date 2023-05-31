export function isIntegerOrFloat(str: string): boolean {
  const num = parseFloat(str);
  return !isNaN(num) && num % 1 !== 0;
}
