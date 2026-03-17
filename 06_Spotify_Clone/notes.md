# 🎵 Music Streaming API

A RESTful backend for music upload and streaming with role-based access control.

---

## Tech Stack

- **Node.js + Express** — HTTP server and routing
- **MongoDB + Mongoose** — Database and ODM
- **JWT (jsonwebtoken)** — Stateless authentication via cookies
- **bcryptjs** — Password hashing
- **Multer** — Multipart file upload handling (in-memory storage)
- **ImageKit** — Cloud storage for audio files
- **cookie-parser** — Cookie parsing middleware

---

## Project Structure

```
├── src/
│   ├── app.js                  # Express app setup and middleware
│   ├── routes/
│   │   ├── auth.routes.js      # /api/auth endpoints
│   │   └── music.routes.js     # /api/music endpoints
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── music.model.js
│   ├── services/
│   │   └── storage.service.js  # ImageKit integration
│   └── db/
│       └── db.js               # MongoDB connection
├── server.js                   # Entry point
└── .env                        # Environment variables
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- ImageKit account

### Installation

1. Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

2. Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/music-app
JWT_SECRET=your_jwt_secret_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

3. Start the server:

```bash
node server.js
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server runs on | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/music-app` |
| `JWT_SECRET` | Secret key for JWT signing | `supersecretkey123` |
| `IMAGEKIT_PRIVATE_KEY` | Private key from ImageKit dashboard | `private_xxxxxxxxxxxx` |

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user or artist. Sets a JWT cookie on success. |
| `POST` | `/api/auth/login` | Login with username/email and password. Sets a JWT cookie. |

**Register request body:**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret123",
  "role": "artist"
}
```

**Login request body:**
```json
{
  "username": "john",
  "password": "secret123"
}
```

---

### Music — `/api/music`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/music/upload` | Artist only | Upload a music file. Accepts `multipart/form-data`. |

**Form fields:**

| Field | Type | Description |
|---|---|---|
| `title` | string | Title of the track |
| `music` | file | Audio file to upload |

---

## Roles & Authorization

| Role | Permissions |
|---|---|
| `user` | Default role. Can register and login. Cannot upload music. |
| `artist` | Can upload music via `POST /api/music/upload`. Pass `role: "artist"` at registration. |

Authorization is JWT-based. The token is stored in an HTTP cookie and verified on protected routes.

---

## Known Issues

The following bugs exist in the current codebase and should be fixed before deploying:

1. **`req.cookie.token`** (`music.controller.js`) — Should be `req.cookies.token`. cookie-parser stores cookies in `req.cookies` (plural).

2. **`jwt.verify(token.process.env.JWT_SECRET)`** (`music.controller.js`) — Missing the second argument. Should be `jwt.verify(token, process.env.JWT_SECRET)`.

3. **`decoded` scoped inside `try/catch`** (`music.controller.js`) — The `decoded` variable is inaccessible when used later to create the music record. Declare it outside the block.

4. **`uploadFile()` missing parameter** (`storage.service.js`) — The function signature is missing `file`. Also `Data.now()` → `Date.now()` and `folfer` → `folder`.

5. **Music routes never mounted** (`app.js`) — The music router is imported but never used. Add:
   ```js
   app.use("/api/music", musicRoutes);
   ```

---
