// Anonymous Function
// function (firstName) {
//   return `Dr. ${firstName}`;
// }

// Function Expression
const doctorize = function (firstName) {
  return `Dr. ${firstName}`;
};

/* eslint-disable */
// const inchToCM = function (inches) {
//   return inches * 2.54;
// };

// this is the same
// const inchToCM = (inches) => {
//   return inches * 2.54;
// };

// this is the same
// const inchToCM = (inches) => { return inches * 2.54; };

// this is the same
// const inchToCM = (inches) => inches * 2.54;

// this is the same
// You can remove the parenthensis if you only got 1 param
const inchToCM = inches => inches * 2.54;
const add = (a, b = 3) =>  a + b;



// function makeABaby(first, last) {
//   const baby = {
//     name: `${first} ${last}`,
//     age: 0
//   }
//   return baby;
// }

// shorter but less readable
const makeABaby = (first, last) => ({ name: `${first} ${last}`, age: 0 });

//IIFE
//Immediately Invoked Function Expression

(function() {
  console.log('Running the anon function')
  return 'You are smart';
})();

// Methods !!
const karen = {
  name: 'karen sido',
  // Method
  sayHi: function() {
    console.log(`Hey ${this.name}`);
    return 'Heyyyy';
  },
  // Short hand method, most common way
  compliment() {
    console.log('You are beautiful');
  },
  // Arrow function
  whisper: () => {
    console.log('I am whispering');
  }
}


// CALLBACK FUNCTIONS
// Click callback
const button = document.querySelector('.clickMe');
button.addEventListener('click', karen.compliment);
//with anon function
button.addEventListener('click', function() {
  console.log('anonymous clicking detected');
})

// Timer Callback is callback function
setTimeout(karen.whisper, 1000);
