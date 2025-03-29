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
    }
    removeBook(id) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return false;
        this.books.splice(bookIndex, 1);

        return true;
    }
    toggleReadStatus(id) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return;
        this.books[bookIndex].read = !this.books[bookIndex].read;
    }
}

class LibraryUI {
    constructor() {}
    renderBook(book) {
        const bookList = document.querySelector("#bookList");
        const bookCard = document.createElement("div");
        bookCard.classList.add("col");
        bookCard.id = `book-${book.id}`;
        bookCard.innerHTML = this.bookCardHTML(book);
        bookList.appendChild(bookCard);

        this.updateCard(bookCard, book);
    }
    renderAll(books) {
        books.forEach((book) => this.renderBook(book));
    }
    updateCard(bookCard, book) {
        bookCard
            .querySelector('[data-action="toggle"]')
            .addEventListener("click", () => {
                // change in data
                myLibrary.toggleReadStatus(book.id);
                // change in DOM
                const updatedBook = myLibrary.books.find(
                    (bookInLibrary) => bookInLibrary.id === book.id
                );
                bookCard.innerHTML = this.bookCardHTML(updatedBook);
                this.updateCard(bookCard, updatedBook);
            });
        bookCard
            .querySelector('[data-action="delete"]')
            .addEventListener("click", () => {
                myLibrary.removeBook(book.id);
                bookCard.remove();
            });
    }
    bookCardHTML(book) {
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
						data-id="${book.id}"
						data-action="toggle">
							Toggle Read
						</button>

						<button type="button"
						class="btn btn-sm btn-danger"
						data-id="${book.id}"
						data-action="delete">
							Delete
						</button>
					</div>
				</div>
			</div>`;
    }

    handleFormSubmit() {
        this.formElements = {
            title: document.querySelector("#title"),
            author: document.querySelector("#author"),
            pages: document.querySelector("#pages"),
            read: document.querySelector("#read"),
            form: document.getElementById("bookForm"),
            modal: document.getElementById("bookModal"),
        };

        const { title, author, pages, read, form, modal } = this.formElements;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const book = new Book(
                null,
                title.value,
                author.value,
                pages.value,
                read.checked
            );

            myLibrary.addBook(book);
            this.renderBook(book);

            // reset form and close modal
            form.reset();
            bootstrap.Modal.getInstance(modal).hide();
        });
    }
}

const myLibrary = new Library();
const ui = new LibraryUI();
ui.renderAll(myLibrary.books);
ui.handleFormSubmit();
