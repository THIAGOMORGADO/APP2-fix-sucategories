interface IConfig {
  dateFormat: 'DD/MM' | 'DD/MM/YY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
  time?: boolean;
}

export const DateHandler = (
  date: Date,
  { dateFormat, time }: IConfig
): string => {
  const d = new Date(date);
  const monthNumer = d.getMonth() + 1;
  const fullDate = {
    DD: d.getDate().toString().padStart(2, '0'),
    MM: monthNumer.toString().padStart(2, '0'),
    YY: d.getFullYear().toString().slice(-2),
    YYYY: d.getFullYear(),
  };

  const splitedDate = dateFormat.split('/') as
    | Array<'DD'>
    | Array<'MM'>
    | Array<'YYYY'>;
  const dateReturn = splitedDate
    .map((item) => fullDate[item])
    .join('/');
  const timeReturn = `${d.getHours().toString().padStart(2, '0')}h${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  return !date
    ? 'Data inválida'
    : time
      ? `${dateReturn} ${timeReturn}`
      : dateReturn;
};
