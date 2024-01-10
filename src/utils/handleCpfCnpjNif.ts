export const handleCpfCnpjNif = (cpfcnpjnifValue: string) => {
  const cpfcnpjnif = cpfcnpjnifValue.replace(/[^0-9]/g, '');

  return cpfcnpjnif.length === 11
    ? { cpf: cpfcnpjnif }
    : cpfcnpjnif.length === 14
      ? { cnpj: cpfcnpjnif }
      : { nif: cpfcnpjnif };
};
