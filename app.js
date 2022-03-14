/* eslint-disable  */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static displayBooks() {
    const books = Book.getBooks();

    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#form-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
     
      <td><button href="#" class="btn btn-danger btn-sm delete">remove</a></button>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }

  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Book.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const book = new Book(title, author);

  Book.addBookToList(book);
  Book.addBook(book);
  Book.clearFields();
});

document.querySelector("#form-list").addEventListener("click", (e) => {
  Book.deleteBook(e.target);

  Book.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
