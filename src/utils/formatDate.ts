export const Today = () => {
  const currentDate = new Date();
  const date = new Date(currentDate.setDate(currentDate.getDate()));

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let months = month < 10 ? '0' + month : month;
  let days = day < 10 ? '0' + day : day;
  let data = `${year}-${months}-${days}`;
  return data;
};

export const Day = () => {
  const currentDate = new Date();
  const date = new Date(
    currentDate.setDate(currentDate.getDate() - 120)
  );

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let months = month < 10 ? '0' + month : month;
  let days = day < 10 ? '0' + day : day;
  let data = `${year}-${months}-${days}`;

  return data;
};

export const Weeknd = () => {
  const currentDate = new Date();
  const date = new Date(
    currentDate.setDate(currentDate.getDate() - 120)
  );

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let months = month < 10 ? '0' + month : month;
  let days = day < 10 ? '0' + day : day;
  let data = `${year}-${months}-${days}`;

  return data;
};
