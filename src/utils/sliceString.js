export function sliceString(str) {
  if (typeof str !== 'string') return '';
  return str.length > 20 ? str.slice(0, 20) + '...' : str;
}
