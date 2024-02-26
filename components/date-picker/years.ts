export const years = (() => {
  const y = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 100; i <= currentYear; i++) {
    y.push(i);
  }

  return y;
})().reverse();
