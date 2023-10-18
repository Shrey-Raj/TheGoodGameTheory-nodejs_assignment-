const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Book = require('./models/Book');

app.use(bodyParser.json());

let books = [];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const { title, author, publicationYear } = req.body;
    const newBook = new Book(books.length + 1, title, author, publicationYear);
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (Update) an existing book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = books.find(book => book.id === id);
    if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
    }
    const { title, author, publicationYear } = req.body;
    updatedBook.title = title;
    updatedBook.author = author;
    updatedBook.publicationYear = publicationYear;
    res.json(updatedBook);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books.splice(index, 1);
    res.json({ message: 'Book removed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
