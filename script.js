class Book {
    constructor(id, title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [
            new Book(null, "The Hobbit", "J.R.R. Tolkien", 295, true),
            new Book(null, "1984", "George Orwell", 328, false),
            new Book(null, "Dune", "Frank Herbert", 412, true),
            new Book(
                null,
                "The Lord of the Rings",
                "J.R.R. Tolkien",
                1178,
                true
            ),
            new Book(
                null,
                "The Hitchhiker's Guide to the Galaxy",
                "Douglas Adams",
                208,
                false
            ),
        ];
    }
    addBook(book) {
        this.books.push(book);

        addBookCard(book);
    }
}

const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    const book = new Book(null, title, author, pages, read);

    addNewBook(book);

    // reset form and close modal
    bookForm.reset();
    let bookModal = bootstrap.Modal.getInstance(
        document.getElementById("bookModal")
    );
    bookModal.hide();
});

const removeBookFromLibrary = (id) => {
    // remove from array
    const bookIndex = myLibrary.findIndex((book) => book.id === id);
    if (bookIndex === -1) return;
    myLibrary.splice(bookIndex, 1);

    // remove from html
    const bookInList = document.querySelector(`#book-${id}`);
    bookInList.parentElement.removeChild(bookInList);
};
const toggleReadStatus = (id) => {
    // change in data
    const bookIndex = myLibrary.findIndex((book) => book.id === id);
    if (bookIndex === -1) return;
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;

    // change in html
    const bookInList = document.querySelector(`#book-${id}`);
    bookInList.innerHTML = bookCardHTML(myLibrary[bookIndex]);
};

const bookCardHTML = (book) => {
    return `
    <div class="card shadow-sm">
        <div class="card-body">
            <h5 class="book-title">
                ${book.title}
                <span class="badge rounded-pill ${
                    book.read ? "text-bg-success" : "text-bg-secondary"
                }">
                    ${book.read ? "Read" : "Unread"}
                </span>
            </h5>
            <h6 class="book-author">${book.author}</h6>
            <p class="book-pages">${book.pages} pages</p>
            <div class="align-items-center">
                <button type="button"
                    class="btn btn-sm btn-warning"
                    onclick="toggleReadStatus('${book.id}')">
                    Toggle Read
                </button>
                <button type="button"
                    class="btn btn-sm btn-danger"
                    onclick="removeBookFromLibrary('${book.id}')">
                    Delete
                </button>
            </div>
        </div>
    </div>`;
};

const addBookCard = (book) => {
    const bookList = document.querySelector("#bookList");
    const bookCard = document.createElement("div");
    bookCard.classList.add("col");
    bookCard.id = `book-${book.id}`;
    bookCard.innerHTML = bookCardHTML(book);
    bookList.appendChild(bookCard);
};

const renderBooks = () => {
    myLibrary.forEach((book) => addBookCard(book));
};

renderBooks();
