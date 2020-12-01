export const getInterpolatedString = (baseString, ...values) =>
  values.reduce(
    (accumulator, value, index) => accumulator.replace(`{{${index}}}`, value),
    baseString
  );
