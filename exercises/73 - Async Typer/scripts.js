function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min, max, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// WITH A FOR OF LOOP

// async function draw(element) {
//   const text = element.textContent;
//   let soFar = '';
//   for (const letter of text) {
//     soFar += letter;
//     element.textContent = soFar;
//     const { typeMin, typeMax } = element.dataset;
//     const amountOfWaitingTime = getRandomBetween(typeMin, typeMax);
//     await wait(amountOfWaitingTime);
//   }
// }

// WITH RECURSION

function draw(element) {
  let index = 1;
  const text = element.textContent;
  const { typeMin, typeMax } = element.dataset;
  async function drawLetter() {
    element.textContent = text.slice(0, index);
    index += 1;
    const amountOfWaitingTime = getRandomBetween(typeMin, typeMax);
    await wait(amountOfWaitingTime);
    if (index <= text.length) {
      drawLetter();
    }
  }
  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
