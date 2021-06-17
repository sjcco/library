let myLibrary = [];

const body = document.querySelector('#body')
const bookshelf = document.querySelector('#library-container')

const bookClasses = ["card", "col-3", "mb-3", "mx-2", "py-3"]
const bookTitleClasses = ["text-center", "card-title", "my-1"]
const bookTextClasses = ["card-text", "text-center"]
const readClasses = ["btn", "btn-primary"]
const notReadClasses = ["btn", "btn-outline-secondary"]



function Book(title, author, numPages, read){
  this.title = title
  this.author = author
  this.numPages = numPages
  this.read = read
}

const $form = document.querySelector("#bookform").addEventListener ("submit", addBookToLibrary)


Book.prototype.info  = function() {
  console.log(title + ' ' + author + ', ' + numPages.toString() + ' pages, ' + status)
}


function addBookToLibrary(e) {
  e.preventDefault();
  
   const newBook = new Book(title.value, author.value, numPages.value, read.checked)
   if (title.value.length === 0 || author.value.length === 0 || numPages.value === "") {
     alert("Please, fill all the fields");
     return;
   }
   else {
     myLibrary.push(newBook); 
     saveToLocalStorage();
   } 
  console.log(myLibrary);
  retrieveLocalStorage()
  console.log('retrieved ' + myLibrary[0].title);
  displayBook(newBook)
}


function deleteBook(currentBook) {
  myLibrary.splice(myLibrary.indexOf(currentBook), 1)
}

function displayBook (book){
  let card = document.createElement("div");
  card.classList.add(...bookClasses);
  bookshelf.appendChild(card);
  console.log(card);



  let cardTitle = document.createElement("h5");
  cardTitle.classList.add(...bookTitleClasses);
  let cardTitleText = document.createTextNode(book.title);
  card.appendChild(cardTitle);
  cardTitle.appendChild(cardTitleText);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-Body");
  card.appendChild(cardBody);

  let cardAuthor = document.createElement("p");
  cardAuthor.classList.add(...bookTextClasses, "fs-4");
  let cardAuthorText = document.createTextNode("by " + book.author);
  cardAuthor.appendChild(cardAuthorText);
  cardBody.appendChild(cardAuthor);

  let cardPages = document.createElement("p");
  cardPages.classList.add(...bookTextClasses, "fs-5");
  let cardPagesText = document.createTextNode("Num. of pages: " + book.numPages);
  cardPages.appendChild(cardPagesText);
  cardBody.appendChild(cardPages);

  let btnsContainer = document.createElement("div");
  btnsContainer.classList.add("d-grid", "gap-2", "col-6", "mx-auto")
  cardBody.appendChild(btnsContainer);

  let readBtn = document.createElement("button");
  let cardReadText;
  if (book.read === true){
    readBtn.classList.add(...readClasses);
    cardReadText = document.createTextNode("Read: Yes");
  }else{
    readBtn.classList.add(...notReadClasses);
    cardReadText = document.createTextNode("Not Read Yet");
  }

  readBtn.setAttribute("id", "read" + book.title)
  readBtn.addEventListener("click", changeStatus)
  readBtn.appendChild(cardReadText);
  btnsContainer.appendChild(readBtn);
  

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "delete" + book.title)
  deleteBtn.addEventListener("click", e =>{
    myLibrary.splice(myLibrary.indexOf()
  }) 
  let deleteBtnText = document.createTextNode("Delete book");
  deleteBtn.classList.add("btn", "btn-danger")
  deleteBtn.appendChild(deleteBtnText);
  btnsContainer.appendChild(deleteBtn);
}

function changeStatus(book){
  if ("Read: Yes" === true) {
   book.read = false
 }
 else{
   book.read = true
 } 
}

function retrieveLocalStorage() {
  // if (localStorage.getItem("mylibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("library"));
  // } else {
  //   library = DEFAULT_DATA;
  // }
}

function saveToLocalStorage (){
  localStorage.clear();
  localStorage.setItem("library", JSON.stringify(myLibrary))
}

