export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '-';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default formatCurrency;
