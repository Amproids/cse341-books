# cse341-books

A small Express API backed by MongoDB for managing book records.

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

## Deployment

The app is deployed at https://cse341-books-n8sa.onrender.com/
