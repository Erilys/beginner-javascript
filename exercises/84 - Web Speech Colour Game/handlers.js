import { isValidColor } from './colors.js';

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
}

export function handleResult({ results }) {
  // logWords(results);
  const words = results[results.length - 1][0].transcript;
  console.log(`heard ya baby, you said ${words}`);
  // lowercase everything
  let color = words.toLowerCase();
  // strip spaces
  color = color.replaceAll(' ', '');
  // check if it's a color
  if (!isValidColor(color)) return;
  console.log(`Yipi ! You know how to pronounce ${color}`);
  // if it is, show UI
  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  document.body.style.backgroundColor = color;
}
