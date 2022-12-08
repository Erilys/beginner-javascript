function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in');
  }

  // Buttons to work with
  // We will fill this when the slider starts
  // We are creating them outside so that multiple function bound to the same closure can access it
  let current;
  let previous;
  let next;

  // Elements needed for the slider
  const slides = slider.querySelector('.slides');
  const previousButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    previous = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log(next);
  }

  function applyClasses() {
    current.classList.add('current');
    previous.classList.add('previous');
    next.classList.add('next');
  }

  function move(direction) {
    // strip classes off current slides
    const classesToRemove = ['previous', 'current', 'next'];
    [previous, current, next].forEach((el) =>
      el.classList.remove(...classesToRemove)
    );
    if (direction === 'back') {
      // make a new array of the new values
      // destructure them over and into the prev, current and next variables
      [previous, current, next] = [
        previous.previousElementSibling || slides.lastElementChild,
        previous,
        current,
      ];
    } else {
      [previous, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  // Run the start slider FN when slider is created
  // Referred as a "constructor"
  startSlider();
  applyClasses();

  // Event listeners
  previousButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const catSlider = Slider(document.querySelector('.cat-slider'));
