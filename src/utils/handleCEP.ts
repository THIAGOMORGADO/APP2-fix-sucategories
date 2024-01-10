export const handleCEP = (cep: string) => {
  // 89.091-119
  return cep
    .split('')
    .map((i, x) => (x === 1 ? `${i}.` : x === 4 ? `${i}-` : i))
    .join('');
};
