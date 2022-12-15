import { hslToRgb } from './utils.js';

const WIDTH = 1000;
const HEIGHT = 800;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

let analyser;
let bufferLength;

function handleError() {
  console.log('You did not gave us access to your mic :(');
}

async function getAudio() {
  const stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(handleError);
  const audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);
  // How much data should I connect ?
  analyser.fftSize = 2 ** 15;
  // pull the data off the audio
  // Each item in this array will be 8 bits (= 1 byt)
  // We can make really big arrays with this, and be safe about what kind of data is allowed in there
  bufferLength = analyser.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  // drawTimeData(timeData);
  drawFrequencyData(frequencyData);
}

function drawTimeData(timeData) {
  // inject time data into our timdata array
  analyser.getByteTimeDomainData(timeData);
  // turn data into something visual
  /// #1 Clear Canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  /// #2 SETUP canvas drawing
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#ffc600';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;
    // draw our lines
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });
  console.log(sliceWidth);
  // call itself as soon as possible
  // Request animation frames : next time browser is about to repaint the screen, call me
  requestAnimationFrame(() => {
    drawTimeData(timeData);
  });
  ctx.stroke();
}

function drawFrequencyData(frequencyData) {
  // ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // get frequencyData in frequencyData arr
  analyser.getByteFrequencyData(frequencyData);
  // figure out the bar width, which will eject the lefter and righter side which are frequencies we can't hear anyway
  const barWidth = WIDTH / bufferLength;
  let x = 0;
  frequencyData.forEach((amount) => {
    // 0 to 255
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barHeight = HEIGHT * percent * 1.2;
    // convert color to HSL (todo)
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 2;
  });

  requestAnimationFrame(() => drawFrequencyData(frequencyData));
}

getAudio();
