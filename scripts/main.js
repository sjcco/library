let myLibrary = [];
const bookshelf = document.querySelector('#library-container');
const DEFAULT_DATA = [
  {
    title: 'The rings in perfect circle',
    author: 'Hinsinjik',
    read: false,
  },
  {
    title: 'Wonderland the Lost Place',
    author: 'Pearl Angle',
    read: true,
  },
  {
    title: 'The Masked Man',
    author: 'Masroto Ginnaju',
    read: false,
  },
];
const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
const bookClasses = ['card', 'col-3', 'mb-3', 'mx-2', 'py-3'];
const bookTitleClasses = ['text-center', 'card-title', 'my-1'];
const bookTextClasses = ['card-text', 'text-center'];
const readClasses = ['btn', 'btn-primary'];
const notReadClasses = ['btn', 'btn-outline-secondary'];


function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

function saveToLocalStorage() {
  localStorage.clear();
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function changeStatus(e) {
  if (e.target.textContent.includes('Not')) {
    e.target.classList.remove(...notReadClasses);
    e.target.classList.add(...readClasses);
    e.target.textContent = 'Read: Yes';
  } else {
    e.target.classList.remove(...readClasses);
    e.target.classList.add(...notReadClasses);
    e.target.textContent = 'Not Read Yet';
  }
}

function clearForm() {
  title.value = '';// eslint-disable-line
  author.value = '';// eslint-disable-line
  numPages.value = '';// eslint-disable-line
}

function displayBook(book) {
  const card = document.createElement('div');
  card.classList.add(...bookClasses);
  bookshelf.appendChild(card);

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add(...bookTitleClasses);
  const cardTitleText = document.createTextNode(book.title);
  card.appendChild(cardTitle);
  cardTitle.appendChild(cardTitleText);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-Body');
  card.appendChild(cardBody);

  const cardAuthor = document.createElement('p');
  cardAuthor.classList.add(...bookTextClasses, 'fs-4');
  const cardAuthorText = document.createTextNode(`by ${book.author}`);
  cardAuthor.appendChild(cardAuthorText);
  cardBody.appendChild(cardAuthor);

  const cardPages = document.createElement('p');
  cardPages.classList.add(...bookTextClasses, 'fs-5');
  const cardPagesText = document.createTextNode(`Num. of pages: ${book.numPages}`);
  cardPages.appendChild(cardPagesText);
  cardBody.appendChild(cardPages);

  const btnsContainer = document.createElement('div');
  btnsContainer.classList.add('d-grid', 'gap-2', 'col-6', 'mx-auto');
  cardBody.appendChild(btnsContainer);

  const readBtn = document.createElement('button');
  let cardReadText;
  if (book.read === true) {
    readBtn.classList.add(...readClasses);
    cardReadText = document.createTextNode('Read: Yes');
  } else {
    readBtn.classList.add(...notReadClasses);
    cardReadText = document.createTextNode('Not Read Yet');
  }

  readBtn.setAttribute('id', `read${book.title}`);
  readBtn.addEventListener('click', changeStatus);
  readBtn.appendChild(cardReadText);
  btnsContainer.appendChild(readBtn);


  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', `delete${book.title}`);
  deleteBtn.setAttribute('data-index', myLibrary.indexOf(book));
  deleteBtn.addEventListener('click', (e) => {
    myLibrary.splice(e.target.dataset.index, 1);
    card.remove();
    saveToLocalStorage();
  });
  const deleteBtnText = document.createTextNode('Delete book');
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.appendChild(deleteBtnText);
  btnsContainer.appendChild(deleteBtn);
  clearForm();
}

function addBookToLibrary(e) {
  e.preventDefault();

  const newBook = new Book(title.value, author.value, numPages.value, read.checked);// eslint-disable-line
  if (title.value.length === 0 || author.value.length === 0 || numPages.value === '') {// eslint-disable-line
    const alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.classList.add('alert', 'alert-warning');


    const alertText = document.createTextNode('Please fill blank Spaces');
    alert.appendChild(alertText);

    const alertParent = document.querySelector('#alert-container');
    alertParent.appendChild(alert);
    setTimeout(del => { alert.remove(); }, 7000);// eslint-disable-line
    return;
  }

  myLibrary.push(newBook);
  saveToLocalStorage();

  displayBook(newBook);
  modal.style.display = 'none';
}

function renderStoredLibrary() {
  if (localStorage.library) {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    myLibrary.forEach((book) => {
      displayBook(book);
    });
  } else {
    myLibrary = DEFAULT_DATA;
    DEFAULT_DATA.forEach((book) => {
      displayBook(book);
    });
  }
}


// When the user clicks on the button, open the modal
btn.onclick = function () {// eslint-disable-line
  modal.style.display = 'block';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {// eslint-disable-line
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};


document.querySelector('#bookform').addEventListener('submit', addBookToLibrary);
renderStoredLibrary();
