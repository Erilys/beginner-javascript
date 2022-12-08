function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found !');
  }
  this.gallery = gallery;

  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // binding our methods to the instance when they need a "this" referring to themself
  this.handleKeyDown = this.handleKeyDown.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // Event listeners
  this.images.forEach((image) =>
    image.addEventListener('click', (event) =>
      this.showImage(event.currentTarget)
    )
  );

  // Accessibility : open image on enter key
  this.images.forEach((image) =>
    image.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.showImage(event.currentTarget);
      }
    })
  );

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
  if (this.modal.matches('.open')) return;
  this.modal.classList.add('open');

  // Event listeners bound to a modal opening
  window.addEventListener('keydown', this.handleKeyDown, { useCapture: true });
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  window.removeEventListener('keydown', this.handleKeyDown, {
    useCapture: true,
  });
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function (event) {
  if (event.target === event.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeyDown = function (event) {
  if (event.key === 'Escape' && this.modal.matches('.open')) {
    event.preventDefault();
    this.closeModal();
    return;
  }
  if (event.key === 'ArrowRight') return this.showNextImage();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showImage = function (element) {
  if (!element) {
    console.info('no image to show');
    return;
  }
  this.modal.querySelector('img').src = element.src;
  this.modal.querySelector('h2').textContent = element.title;
  this.modal.querySelector('figure p').textContent =
    element.dataset.description;
  this.currentImage = element;
  this.openModal();
};

Gallery.prototype.showNextImage = function () {
  console.log(this);
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
