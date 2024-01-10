export function serializeObjectToQueryParams(
  obj: Record<string, any>,
  prefix?: string
): string {
  const str = [];
  let p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p;
      const v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serializeObjectToQueryParams(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
}
