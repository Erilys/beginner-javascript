function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in');
  }

  // Elements needed for the slider
  this.slider = slider;
  this.slides = slider.querySelector('.slides');
  const previousButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // Run the start slider FN when slider is created
  // Referred as a "constructor"
  this.startSlider();
  this.applyClasses();

  // Event listeners
  previousButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function () {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.previous =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.previous.classList.add('previous');
  this.next.classList.add('next');
};

Slider.prototype.move = function (direction) {
  // strip classes off current slides
  console.log(this);
  const classesToRemove = ['previous', 'current', 'next'];
  // [this.previous, this.current, this.next].forEach((el) =>
  //   el.classList.remove(...classesToRemove)
  // );
  this.previous.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);

  if (direction === 'back') {
    // make a new array of the new values
    // destructure them over and into the prev, current and next variables
    [this.previous, this.current, this.next] = [
      this.previous.previousElementSibling || this.slides.lastElementChild,
      this.previous,
      this.current,
    ];
  } else {
    [this.previous, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }

  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const catSlider = new Slider(document.querySelector('.cat-slider'));
