let myLibrary = [];

function Book(title, author, numPages, status){
  this.title = title
  this.author = author
  this.numPages = numPages
  this.status = status
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
  }
}

function changeStatus(book){
  if (status === 'read'){
    book.status = 'not read'
  }
  else{
    book.status = 'read'
  }
}

function deleteBook(currentBook) {
  myLibrary.splice(myLibrary.indexOf(currentBook), 1)
}