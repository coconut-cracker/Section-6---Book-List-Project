class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    console.log(row);

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
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
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    // console.log(isbn);

    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// -----------  Event Listeners -----------

// On DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks());

// ..
document.getElementById("book-form").addEventListener("submit", function(e) {
  // console.log("test");
  e.preventDefault();

  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate the Book constructor/book object:
  const book = new Book(title, author, isbn);

  // Instantiate a new UI Object
  const ui = new UI();

  // Validate UI - check no empty inputs
  if (title.trim() === "" || author.trim() === "" || isbn.trim() === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // If we do this, we see the 'addBookToList' in the UI object's prototype
    console.log(ui);

    // Add Book to list:
    ui.addBookToList(book);

    // Add to LS
    // Don't  need to instantiate with 'new' keyword because the method is static
    Store.addBook(book);

    // Show alert
    ui.showAlert("Book added", "success");

    // Clear the fields
    ui.clearFields();
  }

  // console.log(book);
  // console.log(title, author, isbn);
});

// Event Listener for the delete icon,
// We have to use Event delegation when something happens more than once with the same class, r is dynamicall add late (not there when page loads)

// Using a parent
document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();
  // console.log(123);

  // We have to target the Delete icon - however, going to do it from a prototype methd in the UI ***

  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove from Loacl Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show an aler
  ui.showAlert("Book removed", "success");
});
