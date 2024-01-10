import { type CountryList } from '../@types';

interface IFormat {
  valueToFormat: string | number;
  decimal: string;
  thousand: string;
}

interface ICurrencyOpt {
  trading?: string;
  dividers?: {
    thousand: string;
    decimal: string;
  };
  isInputText?: boolean;
}

const NumberFormat = {
  currency: (
    newValue: number,
    options?: ICurrencyOpt,
    country: CountryList = 'BRA'
  ) => {
    const value = options?.isInputText
      ? newValue
          .toString()
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+/, '')
      : newValue;

    const getTrading = (countryISO: CountryList) => {
      switch (countryISO) {
        case 'BRA':
          return 'R$';
        case 'AGO':
          return 'Kz';
        case 'PRT':
          return '€';
        default:
          return 'R$';
      }
    };

    const getDividers = (countryISO: CountryList) => {
      if (['BRA', 'AGO', 'PRT'].some((item) => item === countryISO))
        return { thousand: '.', decimal: ',' };

      return { thousand: ',', decimal: '.' };
    };

    const setFormat = ({
      valueToFormat,
      thousand,
      decimal,
    }: IFormat) => {
      if (valueToFormat <= 0) return `0${decimal}00`;

      const fullNumber = options?.isInputText
        ? value
        : Math.floor(parseInt(valueToFormat.toString()) * 100);

      const decimals = fullNumber.toString().slice(-2);

      const formated = fullNumber
        .toString()
        .slice(0, -2)
        .split('')
        .reverse()
        .reduce((accumulator, current) => {
          const onlyNumbers = accumulator.replace(thousand, '');
          if (
            onlyNumbers.length !== 0 &&
            onlyNumbers.length % 3 === 0
          )
            return accumulator + thousand + current;

          return accumulator + current;
        }, '')
        .split('')
        .reverse()
        .join('');

      const formatedFinal = !formated ? 0 : formated;
      const decimalsFinal =
        parseInt(decimals, 10) < 10 &&
        decimals.toString().length === 1
          ? `0${decimals}`
          : decimals;

      return formatedFinal + decimal + decimalsFinal;
    };

    const trading = options?.trading || getTrading(country);
    const dividers = options?.dividers || getDividers(country);

    return `${trading} ${setFormat({
      valueToFormat: value,
      ...dividers,
    })}`;
  },
  weight: (value: number) => {
    const setKgFormat = (weightValue: number) => {
      if (Math.floor(weightValue) === weightValue)
        return `${weightValue}Kg`;

      const fullNumber = weightValue;

      const decimals = fullNumber.toString().split('.')[1];

      const formated = fullNumber
        .toString()
        .split('.')[0]
        .split('')
        .reverse()
        .reduce((accumulator, current) => {
          const onlyNumbers = accumulator.replace('.', '');
          if (
            onlyNumbers.length !== 0 &&
            onlyNumbers.length % 3 === 0
          )
            return `${accumulator}.${current}`;

          return accumulator + current;
        }, '')
        .split('')
        .reverse()
        .join('');

      return `${formated},${decimals}Kg`;
    };

    const setGramaFormat = (gramaValue: number) => {
      const gValue = Math.floor(gramaValue * 1000);

      return gValue > 0 ? `${gValue}g` : 'Un';
    };

    return value >= 1 ? setKgFormat(value) : setGramaFormat(value);
  },
  weightInput: (value: string) => {
    if (!value) return '0,000';

    let num = value.toString().replace(/[^0-9]/g, '');

    if (!num) {
      return '0,000';
    }
    // eslint-disable-next-line no-console
    // console.log('1', num);
    const newNum = (parseFloat(num) / 1000).toString().split('.');
    // eslint-disable-next-line no-console
    // console.log('2', newNum);
    num =
      newNum.length > 1
        ? [newNum[0], newNum[1].padEnd(3, '0')].join(',')
        : `${newNum},`.concat(`000`);
    return num;
  },
};
export default NumberFormat;
