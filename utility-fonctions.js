// Returns random item from Array
// But not twice the same in a row
function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  // recursion
  if (item === not) {
    return randomItemFromArray(arr, not);
  }
  return item;
}

// Wait function. Call it with await
function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Random number between min and max
function getRandomBetween(min, max, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// Format Currencies !
// First arg is the langage of the user
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('fr', {
    style: 'currency',
    currency,
  }).format(amount);
}

// is a color dark ?
export function isDark(colorName) {
  const hex = colors[colorName].substring(1, 7);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 120;
}
