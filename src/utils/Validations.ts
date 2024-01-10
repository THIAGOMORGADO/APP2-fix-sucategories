import {
  cpf as cpfValidator,
  cnpj as cnpjValidator,
} from 'cpf-cnpj-validator';

type IStrPad = (
  input: string,
  padLength: number,
  padString: string,
  padType: 'strPad_LEFT' | 'strPad_RIGHT' | 'strPad_BOTH'
) => string;
const strPad: IStrPad = (
  padInput,
  padLength,
  padStringValue,
  padTypeValue
) => {
  let half = '';
  let input = `${padInput}`;
  let padType = `${padTypeValue}`;
  const padString =
    padStringValue !== undefined ? padStringValue : ' ';
  const padToGo = padLength - input.length;

  const strPadRepeater = function (s: string, len: number) {
    let collect = '';

    while (collect.length < len) {
      collect += s;
    }
    collect = collect.substr(0, len);

    return collect;
  };

  if (
    padType !== 'strPad_LEFT' &&
    padType !== 'strPad_RIGHT' &&
    padType !== 'strPad_BOTH'
  ) {
    padType = 'strPad_RIGHT';
  }

  if (padToGo > 0) {
    if (padType === 'strPad_LEFT') {
      input = strPadRepeater(padString, padToGo) + input;
    } else if (padType === 'strPad_RIGHT') {
      input += strPadRepeater(padString, padToGo);
    } else if (padType === 'strPad_BOTH') {
      half = strPadRepeater(padString, Math.ceil(padToGo / 2));
      input = half + input + half;
      input = input.substr(0, padLength);
    }
  }

  return input;
};

const validations = {
  cpf: (cpfToTest: string) => {
    return cpfValidator.isValid(cpfToTest);
  },
  cnpj: (cnpjToTest: string) => {
    return cnpjValidator.isValid(cnpjToTest);
  },
  nif: (nif: string) => {
    if (nif.length >= 9) return true;
    return false;
  },
  renavam: (vehicleRenavam: string) => {
    let renavam = vehicleRenavam.replace(/[^0-9]/, '');

    if (renavam.length < 8 || renavam.length > 11) return false;

    renavam = strPad(renavam, 11, '0', 'strPad_LEFT');

    const renavamSemDigito = renavam.substring(0, 10);
    const renavamReversoSemDigito = renavamSemDigito
      .split('')
      .reverse()
      .join('');

    let soma = 0;
    let multiplicador = 2;
    for (let i = 0; i < 10; i++) {
      const algarismo = renavamReversoSemDigito.substring(i, i + 1);
      soma += parseInt(algarismo) * multiplicador;

      if (multiplicador >= 9) {
        multiplicador = 2;
      } else {
        multiplicador += 1;
      }
    }

    const mod11 = soma % 11;
    let ultimoDigitoCalculado = 11 - mod11;

    ultimoDigitoCalculado =
      ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado;

    const digitoRealInformado = parseInt(
      renavam.substring(renavam.length - 1, renavam.length)
    );

    return ultimoDigitoCalculado === digitoRealInformado;
  },
};

export default validations;
