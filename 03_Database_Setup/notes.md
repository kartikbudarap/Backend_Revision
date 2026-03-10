
# Notes API (MongoDB)

A REST API built with **Express.js** and **MongoDB (Mongoose)** to create, fetch, update, and delete notes.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation

```bash
npm install express mongoose
```

### Running the Server

Create a `server.js` entry point:

```js
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notesdb')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error(err));
```

Then run:

```bash
node server.js
```

---

## Project Structure

```
├── app.js                  # Express app with all routes
├── server.js               # Entry point (DB connection + server start)
└── models/
    └── note.model.js       # Mongoose Note schema
```

### Example `note.model.js`

```js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Note', noteSchema);
```

---

## 📡 API Endpoints

### ➕ Create a Note

```
POST /notes
```

**Request Body (JSON):**
```json
{
  "title": "My Note",
  "description": "This is the content"
}
```

**Response:**
```json
{
  "message": "Post created successfully"
}
```

---

### Get All Notes

```
GET /notes
```

**Response:**
```json
{
  "message": "Notes fetched successfully",
  "notes": [
    {
      "_id": "64abc123...",
      "title": "My Note",
      "description": "This is the content"
    }
  ]
}
```

---

### Update a Note (Partial)

```
PATCH /notes/:id
```

**URL Params:**
- `id` — MongoDB ObjectId of the note

**Request Body (JSON) — send only fields to update:**
```json
{
  "title": "Updated Title"
}
```

**Response:**
```json
{
  "message": "Updated successfully",
  "updatedNote": {
    "_id": "64abc123...",
    "title": "Updated Title",
    "description": "This is the content"
  }
}
```

---

### Delete a Note

```
DELETE /notes/:id
```

**URL Params:**
- `id` — MongoDB ObjectId of the note

**Response:**
```json
{
  "message": "Note deleted successfully"
}
```

---

## Known Bug

In the DELETE route, there is a variable name mismatch:

```js
// Bug
const deleteNode = await noteModel.findByIdAndDelete(noteId);
res.status(200).json({ note: deletedNote }); // 'deletedNote' is not defined

// Fix
const deletedNote = await noteModel.findByIdAndDelete(noteId);
res.status(200).json({ note: deletedNote });
```

---

## Tech Stack

| Tech | Purpose |
|------|---------|
| Express.js | HTTP server & routing |
| Mongoose | MongoDB ODM |
| MongoDB | Database |