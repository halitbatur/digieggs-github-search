export const numberWithCommas = (commaLessNumber: number): string => {
  return commaLessNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
