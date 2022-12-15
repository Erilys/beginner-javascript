import { handleResult } from './handlers.js';
import { colorsByLength, isDark } from './colors.js';

const colorsDiv = document.querySelector('.colors');

function displayColors(colors) {
  return colors
    .map(
      (color) =>
        `<span class="color ${color} ${
          isDark(color) ? 'dark' : ''
        }" style="background: ${color}">${color}</span>`
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRocognition || window.webkitSpeechRecognition;

function start() {
  // check the browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('Sorry ! Browser does not support speech recognition...');
    return;
  }
  console.log('Welcome in the Web Speech Color Game !');
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.intermResults = true;
recognition.onresult = handleResult;
recognition.lang = 'en-US';
recognition.start();

start();
colorsDiv.innerHTML = displayColors(colorsByLength);
