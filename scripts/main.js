let myLibrary = [];

function Book(title, author, numPages, read){
  this.title = title
  this.author = author
  this.numPages = numPages
  this.read = read
}

Book.prototype.info  = function() {
  console.log(title + ' ' + author + ', ' + numPages.toString() + ' pages, ' + status)
}

function addBookToLibrary() {
  const newBook = new Book($title.value, $author.value, $numPages.value, $status.value)
  if ($title.value.length === 0 || $author.value.length === 0) {
    alert("Please, fill all the fields");
    return;
  }
  else {
    myLibrary.push(newBook);  
    updateLocalStorage
  }
}

function changeStatus(book){
  if (read === true) {
    book.read = false
  }
  else{
    book.read = true
  }
}

function deleteBook(currentBook) {
  myLibrary.splice(myLibrary.indexOf(currentBook), 1)
}

function displayBook (book){
  var card = document.createElement(div);
  card.classList.add("card")

  var cardBody = document.createElement(div)
  cardBody.classList.add("card-Body")

  var cardTitle = document.createElement(h5);
  cardTitle.classList.add("card-title")
  cardTitle.textContent(book.title)

  var cardText = document.createElement(p);
  cardText.classList.add("card-text")
  cardText.textContent(book.title)

  cardBody.appendChild(card)
  cardTitle.appendChild(cardBody)
  cardText.appendChild(cardBody)
}

function retrieveLocalStorage() {
  if (localStorage.getItem("mylibrary")) {
    mylibrary = JSON.parse(localStorage.getItem("mylibrary"));
  } else {
    library = DEFAULT_DATA;
  }
}

function updateLocalStorage (){
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
}

