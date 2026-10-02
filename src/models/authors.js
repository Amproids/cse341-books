import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
    const db = getDb();
    const collection = db.collection('authors');
    const authors = await collection.find({}).toArray();
    return authors;
};

const getAuthorById = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const author = await collection.findOne({ id: authorId });
    return author;
};

const postAuthor = async (authorData) => {
    const db = getDb();
    const collection = db.collection('authors');
    await collection.insertOne(authorData);
    return authorData;
};

const updateAuthor = async (authorId, authorData) => {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.findOneAndUpdate(
        { id: authorId },
        { $set: authorData },
        { returnDocument: 'after' }
    );
    return result;
};

const deleteAuthor = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.deleteOne({ id: authorId });
    return result.deletedCount > 0;
};

const countBooksByAuthorId = async (authorId) => {
    const db = getDb();
    const collection = db.collection('books');
    const count = await collection.countDocuments({ authorId });
    return count;
};

export { getAllAuthors, getAuthorById, postAuthor, updateAuthor, deleteAuthor, countBooksByAuthorId };
