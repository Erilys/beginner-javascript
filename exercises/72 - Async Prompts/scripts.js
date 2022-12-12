function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  // popup.remove();
  // This remove above removes would remove from the Dom but keep in JS memory.
  // We shall totaly destroy it
  /* eslint-disable no-param-reassign */
  popup = null;
  /* eslint-enable no-param-reassign */
}

function ask(options) {
  return new Promise(async (resolve) => {
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
        <label>${options.title}</label>
        <input type="text" name="input" />
        <button type="submit"> Submit </button>
      </fieldset>`
    );
    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Annuler';
      popup.firstElementChild.appendChild(skipButton);
      skipButton.addEventListener(
        'click',
        () => {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    popup.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        resolve(event.target.input.value);
        destroyPopup(popup);
      },
      { once: true }
    );

    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add('open');
  });
}

async function askQuestion(event) {
  const button = event.currentTarget;
  const cancel = 'cancel' in button.dataset;
  const answer = await ask({
    title: button.dataset.question,
    cancel,
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach((button) => button.addEventListener('click', askQuestion));

const questions = [
  { title: 'What is your name ?' },
  { title: 'What is your age ?', cancel: true },
  { title: 'How many cats do you have ?' },
];

async function asyncMap(array, callback) {
  const results = [];
  for (const item of array) {
    results.push(await callback(item));
  }
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
