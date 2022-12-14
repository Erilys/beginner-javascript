import { fromSelect, fromInput, toSelect, toAmount } from './elements.js';
import { convert } from './lib.js';
import { formatCurrency } from './utils.js';

export async function handleInput() {
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );
  toAmount.textContent = formatCurrency(rawAmount, toSelect.value);
}
