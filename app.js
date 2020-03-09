// Book Constructor --for creating the actual book object with title, author, isbn etc

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor -- set of constructor methods to do things like add the book to the list, delet the book, show alert etc.

function UI() {}

UI.prototype.addBookToList = function(book) {
  // console.log(book);
  const list = document.getElementById("book-list");
  // Create an element (Table Row -- TR)
  const row = document.createElement("tr");

  console.log(row);

  // Insert Collums -- We are able to get book.title because book is passed into the prototype method/function
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Contruct element
  const div = document.createElement("div");
  // add className
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get Parent to insert into dom
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  // Insert before form, in container
  container.insertBefore(div, form);

  // Timeout after 3s
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book ***
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners
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
  // Show an alert

  ui.showAlert("Book removed", "success");
});
