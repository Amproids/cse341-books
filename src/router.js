import express from 'express';
import {
    getBooksHandler,
    getBookByIdHandler,
    postBooksHandler,
    putBookByIdHandler,
    deleteBookByIdHandler,
} from './controllers/books.js';
import {
    getAuthorsHandler,
    getAuthorByIdHandler,
    postAuthorsHandler,
    putAuthorByIdHandler,
    deleteAuthorByIdHandler,
} from './controllers/authors.js';

const router = express.Router();

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);
router.post('/books', postBooksHandler);
router.put('/books/:id', putBookByIdHandler);
router.delete('/books/:id', deleteBookByIdHandler);

router.get('/authors', getAuthorsHandler);
router.get('/authors/:id', getAuthorByIdHandler);
router.post('/authors', postAuthorsHandler);
router.put('/authors/:id', putAuthorByIdHandler);
router.delete('/authors/:id', deleteAuthorByIdHandler);

export default router;
