export function formatCurrency(amount, currency) {
  return Intl.NumberFormat('fr', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currCode, currName]) =>
        `<option value="${currCode}">${currCode} - ${currName}</option>`
    )
    .join('');
}
