export function returnPossibleUndefinedToNull(
  value: any
): boolean | string | number | null {
  return value && value !== undefined ? value : null;
}
