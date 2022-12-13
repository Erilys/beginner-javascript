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
