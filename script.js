class Book {
	constructor(id, title, author, pages, read) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info() {
		return {
			title: this.title,
			author: this.author,
			pages: this.pages,
			read: this.read,
		};
	}
}

const myLibrary = [
	new Book(null, "The Hobbit", "J.R.R. Tolkien", 295, true),
	new Book(null, "1984", "George Orwell", 328, false),
	new Book(null, "Dune", "Frank Herbert", 412, true),
];

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

const addNewBook = (book) => {
	myLibrary.push(book);

	newBookCard(book);
};

const bookCardHTML = (book) => {
	return `
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="book-title">
                    ${book.title}
                    <span
                        class="badge rounded-pill ${
							book.read ? "text-bg-success" : "text-bg-secondary"
						}"
                        >${book.read ? "Read" : "Unread"}</span
                    >
                </h5>
                <h6 class="book-author">
                    ${book.author}</h6>
                <p class="book-pages">
                    ${book.pages} pages</p>
                <p>id: ${book.id}</p>
                <div class="align-items-center">
                    <button
                        type="button"
                        class="btn btn-sm btn-warning"
                    >
                        Toggle Read
                    </button>
                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>`;
};

const newBookCard = (book) => {
	const bookCard = document.createElement("div");
	bookCard.classList.add("col");
	bookCard.innerHTML = bookCardHTML(book);
	bookList.appendChild(bookCard);
};

const renderBooks = () => {
	const bookList = document.querySelector("#bookList");

	myLibrary.forEach((book) => newBookCard(book));
};

renderBooks();
