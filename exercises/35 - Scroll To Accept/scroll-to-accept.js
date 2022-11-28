const terms = document.querySelector('.terms-and-conditions');
const button = document.querySelector('.accept');

/// TWO WAYS OF SEEING UX

// 1. Enable button when you're down the page, disable when you scroll up
// function obCallback(payload) {
//   if (payload[0].intersectionRatio === 1) {
//     button.disabled = false;
//   } else {
//     button.disabled = true;
//   }
// }

// 2. Enable button when you're down the page, keeps it enabled event if you scroll up
function obCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    ob.unobserve(terms.lastElementChild);
  }
}

const ob = new IntersectionObserver(obCallback, {
  root: terms,
  // Threshold = how much of this element is on the page (0 to 1)
  // Warning = big elements will never be at 100% in the page
  // It must be small enough to fit !! Here it's a small hr tag
  threshold: 1,
});

ob.observe(terms.lastElementChild);

// Old way of doing it : watch the scroll event and run some complicated calculations
// terms.addEventListener('scroll', (event) => {
//   console.log(event.currentTarget.scrollTop);
//   console.log(event.currentTarget.scrollHeight);
// });
