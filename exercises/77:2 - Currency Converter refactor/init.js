import currencies from './currencies.js';
import { generateOptions } from './utils.js';
import { fromSelect, toSelect } from './elements.js';
import { handleInput } from './handlers.js';

function init() {
  const form = document.querySelector('.app form');

  const optionsHTML = generateOptions(currencies);
  fromSelect.innerHTML = optionsHTML;
  toSelect.innerHTML = optionsHTML;

  form.addEventListener('input', handleInput);
}

export default init;
