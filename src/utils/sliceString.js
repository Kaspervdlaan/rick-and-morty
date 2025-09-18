export function sliceString(str, maxLength = 20) {
  if (typeof str !== 'string') return '';
  return str.length > maxLength ? str.slice(0, maxLength - 4) + '...' : str;
}
