document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add');
    const addBookForm = document.getElementById('addBookForm');
    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookPagesInput = document.getElementById('bookPages');
    const saveBookButton = document.getElementById('saveBook');
    const closeButton = document.querySelector('#addBookForm .close');
    const libraryContainer = document.getElementById('libraryContainer');

    const myLibrary = [];

    function Book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = false;
    }

    function addBookLibrary() {
        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        const pages = bookPagesInput.value;

        if (title === '' || author === '' || pages === '') {
            alert('Please fill in all fields');
            return;
        }

        const newBook = new Book(title, author, pages);
        myLibrary.push(newBook);

        bookTitleInput.value = '';
        bookAuthorInput.value = '';
        bookPagesInput.value = '';

        displayLibrary();

        addBookForm.style.display = 'none';
    }

    addButton.addEventListener('click', function() {
        addBookForm.style.display = 'block';
    });

    saveBookButton.addEventListener('click', addBookLibrary);

    closeButton.addEventListener('click', function() {
        addBookForm.style.display = 'none';
    });

    function displayLibrary() {
        libraryContainer.innerHTML = '';

        myLibrary.forEach((book, index) => {
            const bookCard = createBookCard(book, index);
            libraryContainer.appendChild(bookCard);
        });
    }

    function createBookCard(book, index) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-card');
        bookElement.style.border = '2px solid black';
        bookElement.style.padding = '20px';
        bookElement.style.marginBottom = '20px';
        bookElement.style.backgroundColor = 'pink';


        const title = document.createElement('p');
        title.textContent = book.title;
        bookElement.appendChild(title);

        const author = document.createElement('p');
        author.textContent = book.author;
        bookElement.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;
        bookElement.appendChild(pages);

        const readBtn = document.createElement('button');
        readBtn.textContent = book.isRead ? 'Read' : 'Not Read';
        readBtn.classList.add(book.isRead ? 'btn-light-green' : 'btn-light-red');
        readBtn.addEventListener('click', function() {
            toogleReadStatus(index);
        });
        bookElement.appendChild(readBtn);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            removeBook(index);
        });
        bookElement.appendChild(deleteButton);

        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return';
        returnButton.classList.add('return-button');
        returnButton.addEventListener('click', function() {
            returnBook(index);
        });

        bookElement.appendChild(returnButton);


        return bookElement;
    }

    function toogleReadStatus(index) {
        myLibrary[index].isRead = !myLibrary[index].isRead;
        displayLibrary();
    }

    function removeBook(index) {
        myLibrary.splice(index, 1);
        displayLibrary();
    }

    let previousState = '';

    function returnBook() {
        libraryContainer.innerHTML = previousState;
        addBookForm.style.display = 'block';
    }

    displayLibrary();

});