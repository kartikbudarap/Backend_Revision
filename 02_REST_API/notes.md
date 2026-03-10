# Notes API

A simple REST API built with **Express.js** to create, fetch, and delete notes.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- npm

### Installation

```bash
npm install express
```

### Running the Server

```bash
node app.js
```

> Make sure you have a separate entry point (e.g., `server.js`) that imports `app` and calls `app.listen()`.

Example `server.js`:
```js
const app = require('./app');
app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 📡 API Endpoints

### Create a Note

```
POST /notes
```

**Request Body (JSON):**
```json
{
  "title": "My Note",
  "content": "This is the content"
}
```

**Response:**
```json
{
  "message": "Note created",
  "notes": [{ "title": "My Note", "content": "This is the content" }]
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
  "message": "ntoes fetched successfully",
  "notes": [...]
}
```

---

### Delete a Note

```
DELETE /delete/:index
```

**URL Params:**
- `index` — the array index of the note to delete

**Response:**
```json
{
  "message": "Deleted successfully"
}
```

---

## Middleware

- `express.json()` — parses incoming JSON request bodies so `req.body` works correctly.

---

## Project Structure

```
├── app.js       # Express app with routes
└── server.js    # Entry point (starts the server)
```

---

## Notes

- Data is stored **in-memory** (the `notes` array). All notes are lost when the server restarts.
- For persistent storage, consider integrating a database like MongoDB or SQLite.
- The delete route uses `delete notes[index]` which leaves a `undefined` hole in the array rather than removing the element. Consider using `notes.splice(index, 1)` for cleaner deletion.