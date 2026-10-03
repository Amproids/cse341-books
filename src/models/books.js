import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();
    return books;
};

const getBookById = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');
    const book = await collection.findOne({ id: bookId });
    return book;
};

const postBook = async (bookData) => {
    const db = getDb();
    const collection = db.collection('books');
    await collection.insertOne(bookData);
    return bookData;
};

const updateBook = async (bookId, bookData) => {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.findOneAndUpdate(
        { id: bookId },
        { $set: bookData },
        { returnDocument: 'after' }
    );
    return result;
};

const deleteBook = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.deleteOne({ id: bookId });
    return result.deletedCount > 0;
};

export { getAllBooks, getBookById, postBook, updateBook, deleteBook };