import { getAllBooks, getBookById, postBook, updateBook, deleteBook } from '../models/books.js';
import { getAuthorById } from '../models/authors.js';

const REQUIRED_CREATE_FIELDS = ['id', 'authorId', 'title', 'publicationDate'];
const REQUIRED_UPDATE_FIELDS = ['authorId', 'title', 'publicationDate'];

const missingFields = (body, fields) => {
    return fields.filter((field) => {
        return !body || typeof body[field] !== 'string' || !body[field].trim();
    });
};

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postBooksHandler = async (req, res) => {
    const bookInfo = req.body;
    const missing = missingFields(bookInfo, REQUIRED_CREATE_FIELDS);

    if (missing.length) {
        return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }

    try {
        const existingBook = await getBookById(bookInfo.id);

        if (existingBook) {
            return res.status(400).json({ message: `Book with id ${bookInfo.id} already exists` });
        }

        const author = await getAuthorById(bookInfo.authorId);

        if (!author) {
            return res.status(400).json({ message: `Author with id ${bookInfo.authorId} does not exist` });
        }

        const book = await postBook(bookInfo);
        return res.status(201).json(book);
    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const putBookByIdHandler = async (req, res) => {
    const putBookId = req.params.id;
    const bookInfo = req.body;
    const missing = missingFields(bookInfo, REQUIRED_UPDATE_FIELDS);

    if (missing.length) {
        return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }

    try {
        const author = await getAuthorById(bookInfo.authorId);

        if (!author) {
            return res.status(400).json({ message: `Author with id ${bookInfo.authorId} does not exist` });
        }

        const book = await updateBook(putBookId, bookInfo);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBookByIdHandler = async (req, res) => {
    const bookId = req.params.id;

    try {
        const deleted = await deleteBook(bookId);

        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getBooksHandler,
    getBookByIdHandler,
    postBooksHandler,
    putBookByIdHandler,
    deleteBookByIdHandler,
};
