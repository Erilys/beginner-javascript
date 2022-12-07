function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found !');
  }

  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    if (modal.matches('.open')) {
      console.info('Modal already opened');
    }
    modal.classList.add('open');

    // Event listeners bound to a modal opening
    window.addEventListener('keydown', handleKeyDown, { useCapture: true });
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keydown', handleKeyDown, { useCapture: true });
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && modal.matches('.open')) {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showImage(element) {
    if (!element) {
      console.info('no image to show');
      return;
    }
    modal.querySelector('img').src = element.src;
    modal.querySelector('h2').textContent = element.title;
    modal.querySelector('figure p').textContent = element.dataset.description;
    currentImage = element;
    openModal();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // Event listeners
  images.forEach((image) =>
    image.addEventListener('click', (event) => showImage(event.currentTarget))
  );

  // Accessibility : open image on enter key
  images.forEach((image) =>
    image.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        showImage(event.currentTarget);
      }
    })
  );

  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
