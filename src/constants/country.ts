export type EnabledCountriesNameType =
  | 'Angola'
  | 'Brasil'
  | 'Portugal';

export type EnabledCountriesValueType =
  | 'angola'
  | 'brasil'
  | 'portugal';

export type EnabledCountryListType = 'BRA' | 'PRT' | 'AGO';

export type EnabledCountries = Array<{
  nome: EnabledCountriesNameType;
  id: EnabledCountryListType;
}>;

export const ENABLED_COUNTRIES: EnabledCountries = [
  {
    nome: 'Angola',
    id: 'AGO',
  },
  {
    nome: 'Brasil',
    id: 'BRA',
  },
  {
    nome: 'Portugal',
    id: 'PRT',
  },
];
