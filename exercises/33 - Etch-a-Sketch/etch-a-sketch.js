// Select the elements you need on the page

const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');

/// true constant : this value will never change ; use uppercase and _
const MOVE_AMOUNT = 25;

// Setup our canvas for drawing

/// Make a variable called height and width from the same properties on our canvas.
/// This is destructuring
/// same as const width = canvas.width; const height = canvas.height
const { width, height } = canvas;

// create random x and y starting points
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

/// This dot should be round
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
/// This dot should be 10px large. You don't have to specify pixels
ctx.lineWidth = MOVE_AMOUNT;

/// Color
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y); // 200 pixels over and 200 pixels down
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function

function draw({ key }) {
  // increment the hue
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move our x and y values depending on what the user did

  switch (key) {
    case 'ArrowUp':
      if (y > MOVE_AMOUNT) {
        y -= MOVE_AMOUNT;
      }
      break;
    case 'ArrowDown':
      if (y < height - MOVE_AMOUNT) {
        y += MOVE_AMOUNT;
      }
      break;
    case 'ArrowLeft':
      if (x > MOVE_AMOUNT) {
        x -= MOVE_AMOUNT;
      }
      break;
    case 'ArrowRight':
      if (x < width - MOVE_AMOUNT) {
        x += MOVE_AMOUNT;
      }
      break;
    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// write a handler for the keys

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault(); // prevent down/up key to scroll narrow windows
    draw({ key: e.key });
  }
}

// clear canvas
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

shakebutton.addEventListener('click', clearCanvas);

// listen for arrow keys
window.addEventListener('keydown', handleKey);
