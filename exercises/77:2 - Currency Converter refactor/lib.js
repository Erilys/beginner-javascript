const ratesByBase = {};

const myHeaders = new Headers();
myHeaders.append('apikey', '5EvuTnsg6fX24Aw4Fl2JWS29PVtX0ugU');

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

async function fetchRates(base = 'EUR') {
  const rates = await fetch(
    `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
    requestOptions
  ).then((response) => response.json());
  return rates;
}

export async function convert(amount, from, to) {
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
