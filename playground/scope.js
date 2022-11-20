/// SCOPES

// VAR variable are accessible via the window (not a good practice though)
const name = 'karen';
// in the browser : window.name = 'Karen'
// window.setTimeout = setTimeout
// Anything in the global SCOPE is attached to the WINDOW object, except from LET and CONST variables.

// Block and function scopes
// Var variable (unlike let and const) are not block scoped, they are function scoped.
// -> A var is accessible outside the block where it was created. Others don't.

// LEXICLE / STATIC scoping
// Scope look up is where the function is defined, not where its called

const cat = 'Fox';

function logCat() {
  console.log(cat);
}

function callCat() {
  const cat = 'Pico';
  logCat();
}

// render 'Fox'
callCat();

// Best practices
// Try not to create global variables as this can lead to conflicts

// Function are block scoped like variables
// -> Function inside another function won't be available in another context
