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

const render = () => {
	const bookList = document.querySelector("#bookList");

	myLibrary.forEach((book) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("col");
		bookCard.innerHTML = `
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
        </div>
        `;
		bookList.appendChild(bookCard);
	});
};

render();
