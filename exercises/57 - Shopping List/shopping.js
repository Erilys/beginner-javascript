const shoppingForm = document.querySelector('.shopping');
const shoppingList = document.querySelector('.list');

// This is a 'State'
// When this state changes, we re-render out the html on the page
let items = [];

function handleSubmit(event) {
  event.preventDefault();
  const name = event.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  console.log(`There are now ${items.length} item in your state`);
  event.target.reset(); // will clear event multiple inputs on this form
  // fire off a custom event that will tell anyone who cares that an item was added/updated
  shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
      <input 
        type="checkbox"
        value="${item.id}"
        ${item.complete ? 'checked' : ''}
      >
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}" value="${item.id}" >&times;
      </button>
      </input>
  </li>`
    )
    .join('');
  shoppingList.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems) {
    // prevent error cause localStorage starts with nothing, not event empty array
    items.push(...lsItems);
    shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
shoppingList.addEventListener('itemsUpdated', displayItems);
shoppingList.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event Delegation : we listen on ul but delegate on the button if it is the actual target
shoppingList.addEventListener('click', (event) => {
  const id = parseInt(event.target.value);
  if (event.target.matches('button')) {
    deleteItem(id);
  }
  if (event.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
