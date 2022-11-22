// Make a div
const myDiv = document.createElement('div');
// add a class of wrapper to it
myDiv.classList.add('wrapper');
// put it into the body
document.body.append(myDiv);

// make an unordered list
// add three list items with the words "one, two, three" in them
const myList = `
  <ul>
    <li> one </li>
    <li> two </li>
    <li> three </li>
  </ul>
`;

// put that list into the above wrapper
myDiv.innerHTML = myList;

// create an image
const myImg = document.createElement('img');
// set the source to an image
myImg.src = 'https://source.unsplash.com/random/300x300';
// set the width to 250
myImg.width = 200;
// add a class of cute
myImg.classList.add('cute');
// add an alt of Cute Puppy
myImg.alt = 'Cute Kitty';
// Append that image to the wrapper
myDiv.append(myImg);

// with HTML string, make a div, with two paragraphs inside of it
const myNewElement = `
  <div>
    <p> </p>
    <p>Paragraph two</p>
  </div>
`;
// put this div before the unordered list from above
myDiv.insertAdjacentHTML('afterbegin', myNewElement);

// add a class to the second paragraph called warning
// remove the first paragraph
myDiv.firstElementChild.lastElementChild.classList.add('warning');
myDiv.firstElementChild.firstElementChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height

// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

function generatePlayerCard(name, age, height) {
  return `
  <div class="playerCard">
    <h2>${name.toUpperCase()} — ${age}</h2>
    <p>They are ${height} and ${age} years old. In Dog years this person would be ${
    age * 7
  }. That would be a tall dog!</p>
  </div>
  `;
}

// make a new div with a class of cards
const cards = document.createElement('div');
cards.classList.add('cards');

// make 4 player cards using generatePlayerCard
const player1 = generatePlayerCard('Karen', 30, '172cm');
const player2 = generatePlayerCard('Pierre', 30, '175cm');
const player4 = generatePlayerCard('Fox', 8, '30cm');
const player3 = generatePlayerCard('Pico', 1, '35cm');

// append those cards to the div
cards.innerHTML = player1 + player2 + player3 + player4;

// put the div into the DOM just before the wrapper element
myDiv.insertAdjacentElement('beforebegin', cards);
// Bonus, put a delete Button on each card so when you click it, the whole card is removed
// select all the buttons!
// make out delete function
// loop over them and attach a listener

const deleteButton = `<button class="delete-button" type="button">Supprime-moi !</button>`;

const myCards = document.querySelectorAll('.playerCard');

myCards.forEach((card) => {
  card.insertAdjacentHTML('beforeend', deleteButton);
  const btn = card.querySelector('.delete-button');
  btn.addEventListener('click', () => {
    card.remove();
  });
});

// Pagehey explained - why eventlistener HAVE to take a function
// Because if you don't they are no way to tell if you wish to trigger the function, or its return (which can also be a function )

function callbackGenerator(type) {
  if (type === 'dog') {
    return () => {
      console.log('ouaf');
    };
  }
  if (type === 'cat') {
    return () => {
      console.log('meow');
    };
  }
}

btn.addEventListener('click', () => console.log('yo'));
btn.addEventListener('click', callbackGenerator('dog'));
