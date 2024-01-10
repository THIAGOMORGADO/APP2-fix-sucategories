import { type Countries, type CountryList } from '../@types/user';

export const CountryHandler = {
  NameToISO: (country: Countries | undefined) => {
    const countryName = country || 'brasil';
    const countryList: { [K in typeof countryName]: CountryList } = {
      angola: 'AGO',
      brasil: 'BRA',
      portugal: 'PRT',
    };

    return countryList[countryName];
  },

  ISOToName: (countryISO: CountryList | undefined) => {
    const countryName = countryISO || 'BRA';
    const countryList: { [K in typeof countryName]: Countries } = {
      AGO: 'angola',
      BRA: 'brasil',
      PRT: 'portugal',
    };

    return countryList[countryName];
  },
};
