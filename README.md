# cse341-books

A small Express API backed by MongoDB for managing book and author records.

## Setup

Create a `.env` file with the following variables:

```
PORT=3000
MONGODB_URI=your mongodb connection string
MONGODB_DB_NAME=cse341-books-db
```

Install dependencies with `npm install`, then run the app locally with `npm run dev`.

## Routes

`GET /` returns a status message confirming the server is running.

`GET /books` returns all books as a JSON array.

`GET /books/:id` returns a single book by its `id` field, or a 404 message if no match is found.

`POST /books` creates a book from the JSON request body (`id`, `authorId`, `title`, and `publicationDate` are required) and returns the created record, or a 400 message if a required field is missing, the `id` already exists, or the `authorId` doesn't match a real author.

`PUT /books/:id` updates the book matching `id` with the JSON request body (`authorId`, `title`, and `publicationDate` are required) and returns the updated record, or a 400 message if a required field is missing or the `authorId` doesn't match a real author, or a 404 message if no match is found.

`DELETE /books/:id` deletes the book matching `id` and returns a 204 status, or a 404 message if no match is found.

`GET /authors` returns all authors as a JSON array.

`GET /authors/:id` returns a single author by its `id` field, or a 404 message if no match is found.

`POST /authors` creates an author from the JSON request body (`id` and `name` are required) and returns the created record, or a 400 message if a required field is missing or the `id` already exists.

`PUT /authors/:id` updates the author matching `id` with the JSON request body (`name` is required) and returns the updated record, or a 404 message if no match is found.

`DELETE /authors/:id` deletes the author matching `id` and returns a 204 status, a 404 message if no match is found, or a 409 message if one or more books still reference this author.

## API Documentation

Interactive Swagger documentation is available at `/api-docs` both locally and on the deployed app.

## Deployment

The app is deployed at https://cse341-books-n8sa.onrender.com/
