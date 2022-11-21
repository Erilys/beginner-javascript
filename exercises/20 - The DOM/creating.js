const list = document.createElement('ul');

const thirdElement = document.createElement('li');
thirdElement.textContent = 'Troisième élément';
list.appendChild(thirdElement);

const secondElement = document.createElement('li');
secondElement.textContent = 'Second élément';
list.insertAdjacentElement('afterbegin', secondElement);
document.body.appendChild(list);
