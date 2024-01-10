export const handleImg = (img: string): boolean => {
  const def = [
    'https://fieldrightapi.herokuapp.com/images/',
    'https://fieldrightapi.herokuapp.com/images/',
  ];

  return !def.some((d) => d === img);
};
