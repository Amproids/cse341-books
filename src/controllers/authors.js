import {
    getAllAuthors,
    getAuthorById,
    postAuthor,
    updateAuthor,
    deleteAuthor,
    countBooksByAuthorId,
} from '../models/authors.js';

const REQUIRED_CREATE_FIELDS = ['id', 'name'];
const REQUIRED_UPDATE_FIELDS = ['name'];

const missingFields = (body, fields) => {
    return fields.filter((field) => {
        return !body || typeof body[field] !== 'string' || !body[field].trim();
    });
};

const getAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.error('GET /authors failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAuthorByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const author = await getAuthorById(requestedId);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('GET /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postAuthorsHandler = async (req, res) => {
    const authorInfo = req.body;
    const missing = missingFields(authorInfo, REQUIRED_CREATE_FIELDS);

    if (missing.length) {
        return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }

    try {
        const existingAuthor = await getAuthorById(authorInfo.id);

        if (existingAuthor) {
            return res.status(400).json({ message: `Author with id ${authorInfo.id} already exists` });
        }

        const author = await postAuthor(authorInfo);
        return res.status(201).json(author);
    } catch (error) {
        console.error('POST /authors failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const putAuthorByIdHandler = async (req, res) => {
    const authorId = req.params.id;
    const authorInfo = req.body;
    const missing = missingFields(authorInfo, REQUIRED_UPDATE_FIELDS);

    if (missing.length) {
        return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }

    try {
        const author = await updateAuthor(authorId, authorInfo);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('PUT /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAuthorByIdHandler = async (req, res) => {
    const authorId = req.params.id;

    try {
        const referencingBookCount = await countBooksByAuthorId(authorId);

        if (referencingBookCount > 0) {
            return res.status(409).json({
                message: `Cannot delete author ${authorId}: ${referencingBookCount} book(s) still reference this author`,
            });
        }

        const deleted = await deleteAuthor(authorId);

        if (!deleted) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getAuthorsHandler,
    getAuthorByIdHandler,
    postAuthorsHandler,
    putAuthorByIdHandler,
    deleteAuthorByIdHandler,
};
