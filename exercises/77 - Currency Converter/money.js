const fromSelect = document.querySelector('[name="from_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toSelect = document.querySelector('[name="to_currency"]');
const toAmount = document.querySelector('.to_amount');
const form = document.querySelector('.app form');

const myHeaders = new Headers();
myHeaders.append('apikey', '5EvuTnsg6fX24Aw4Fl2JWS29PVtX0ugU');

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

const ratesByBase = {};

const currencies = {
  EUR: 'Euro',
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currCode, currName]) =>
        `<option value="${currCode}">${currCode} - ${currName}</option>`
    )
    .join('');
}

async function fetchRates(base = 'EUR') {
  const rates = await fetch(
    `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
    requestOptions
  ).then((response) => response.json());
  return rates;
}

async function convert(amount, from, to) {
  // first check if we already have to rate to convert from this currency
  if (!ratesByBase[from]) {
    console.log(
      `Oh no, we don't have ${from} to convert to ${to}. Let's go get it`
    );
    ratesByBase[from] = await fetchRates(from);
  }
  const rate = ratesByBase[from].rates[to];
  return rate * amount;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('fr', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(event) {
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );
  toAmount.textContent = formatCurrency(rawAmount, toSelect.value);
}

const optionsHTML = generateOptions(currencies);
// populate the options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener('input', handleInput);
