// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.

const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new window.FaceDetector();

const optionsInput = document.querySelector('.controls input[type="range"]');

function handleOption(event) {
  options.SIZE = parseFloat(event.currentTarget.value);
}
optionsInput.addEventListener('change', handleOption);

const options = {
  SIZE: 10,
};

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 360 },
  });
  video.srcObject = stream;
  await video.play();

  // size the canvas same as video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(drawFace);
  faces.forEach(censor);
  // console.log(faces.length);
  // recursion: a function call itself within itself
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small face
  faceCtx.drawImage(
    // 5 source args
    video, // where does the source come from
    face.x, // where do we start to pull the source from
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x, // where should we start drawing the x and y
    face.y,
    options.SIZE,
    options.SIZE
  );
  // draw the small face back on, but scale up
  faceCtx.drawImage(
    faceCanvas, // source
    face.x,
    face.y,
    options.SIZE,
    options.SIZE,
    // drawing args
    face.x,
    face.y,
    face.width,
    face.height
  );
}

populateVideo().then(detect);
