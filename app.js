/* eslint-disable  */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static clearField() {
    const title = document.getElementById("title");
    const author = document.getElementById("author");

    title.value = "";
    author.value = "";
  }

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentNode.remove();
    }
  }

  static displayBooks() {
    defaultBooks.forEach((book) => Book.addBooksToList(book));
  }

  static addBooksToList(book) {
    const list = document.getElementById("form-list");
    const row = document.createElement("tr");

    row.innerHTML = `
     ${book.title} <br>
    ${book.author}<br>
    <button class="delete">Remove</button>
    `;

    list.appendChild(row);
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static getBooks() {
    const books = localStorage.getItem("books");
    if (!books) return [];
    return JSON.parse(books);
  }

  static removeBook(title) {
    const books = Book.getBooks();
    const otherBook = books.filter((item) => item.title !== title);

    localStorage.setItem("books", JSON.stringify(otherBook));
  }
}

document.addEventListener("DOMContentLoaded", Book.displayBooks);

document
  .getElementById("book-form")
  .addEventListener("submit", addABook, false);

function addABook(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const book = new Book(title, author);

  Book.addBooksToList(book);

  Book.clearField();

  Book.addBook(book);
}

document.getElementById("form-list").addEventListener("click", remove);
function remove(e) {
  Book.deleteBook(e.target);
  Book.removeBook(e.target.parentElement.previousElementSibling.textContent);
}
