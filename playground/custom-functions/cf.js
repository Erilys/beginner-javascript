// Function definition
function calculateBill(billAmount, taxRate = 0.05, tipRate = 0.15) {
  // this is the function body
  const total = billAmount + billAmount * taxRate + billAmount * tipRate;
  return total;
}

// Function call, or "Run"
// Passing undefined as an argument > fall back to the default value
console.log(`Your bill is $${calculateBill(100, undefined, 0.2)}`);

function doctorize(name = 'stranger') {
  return `Dr ${name}`;
}

function yell(name = 'some stranger') {
  return `HEY ${name.toUpperCase()}`;
}

console.log(yell(doctorize()));
