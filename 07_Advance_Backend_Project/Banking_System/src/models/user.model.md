# User Model — Code Explanation

This file is a **Mongoose user schema** for a Node.js/MongoDB application. It handles user data structure, password hashing, and password verification.

---

## 1. Imports

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
```

- `mongoose` — ODM (Object Document Mapper) library that lets you define schemas and interact with MongoDB using JavaScript objects.
- `bcryptjs` — A library used to **hash** (encrypt) passwords before storing them, and to **compare** a plain-text password against its stored hash.

---

## 2. Schema Definition

```javascript
const userSchema = new mongoose.Schema({ ... }, { timestamps: true });
```

`mongoose.Schema` creates a blueprint for what a "user" document looks like in MongoDB.

The second argument `{ timestamps: true }` automatically adds two fields to every document:
- `createdAt` — the date/time the document was created
- `updatedAt` — the date/time the document was last modified

---

## 3. Fields

### `email`

```javascript
email: {
  type: String,
  required: [true, "Email is required for creating a user"],
  trim: true,
  lowercase: true,
  unique: [true, "Email already exists, please use another email"],
  match: [
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "Please fill a valid email address",
  ],
},
```

| Option | Purpose |
|--------|---------|
| `type: String` | The value must be a string |
| `required` | This field cannot be empty; shows a custom error message if missing |
| `trim: true` | Strips leading and trailing whitespace (e.g., `" user@email.com "` → `"user@email.com"`) |
| `lowercase: true` | Converts the email to lowercase before saving (e.g., `"User@Email.COM"` → `"user@email.com"`) |
| `unique` | Ensures no two users can have the same email in the database |
| `match` | Validates the email against a regex pattern to confirm it looks like a valid email address |

---

### `name`

```javascript
name: {
  type: String,
  required: [true, "Name is required for creating a user"],
},
```

- A simple required string field for the user's display name.
- No trimming or uniqueness constraint — two users can share the same name.

---

### `password`

```javascript
password: {
  type: String,
  required: [true, "Password is required for creating a user"],
  minLength: [6, "Password must be at least 6 characters long"],
  select: false,
},
```

| Option | Purpose |
|--------|---------|
| `type: String` | Stored as a string (will be a bcrypt hash, not plain text) |
| `required` | Cannot be empty |
| `minLength` | Must be at least 6 characters; Mongoose validates this on the raw input before hashing |
| `select: false` | **Excludes** the password field from query results by default — so when you do `User.find()`, the password hash is never sent back unless you explicitly ask for it with `.select("+password")` |

---

## 4. Pre-Save Middleware (Password Hashing)

```javascript
userSchema.pre("save", async function(next) {
    if (!this.isModified("password"))
        return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
});
```

This is a **Mongoose middleware hook** that runs automatically **before** every `.save()` call on a user document.

- `pre("save", ...)` — registers a function to execute before the document is saved to MongoDB.
- `async function(next)` — uses a regular (non-arrow) function so that `this` refers to the **current user document** being saved. `next` is called to pass control to the next middleware or the actual save operation.
- `this.isModified("password")` — checks whether the password field has been changed. If it hasn't (e.g., updating only the user's name), the function calls `next()` immediately and skips re-hashing. This prevents double-hashing an already hashed password.
- `bcrypt.hash(this.password, 10)` — hashes the plain-text password. The second argument `10` is the **salt rounds** — how many times the hashing algorithm runs. Higher = more secure but slower. `10` is the standard recommended value.
- `this.password = hash` — replaces the plain-text password with the generated hash before it's persisted to MongoDB.

---

## 5. Instance Method (Password Comparison)

```javascript
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
```

This adds a custom method to every user document instance. You can call it like:

```javascript
const isMatch = await user.comparePassword("plaintextPassword");
```

- `bcrypt.compare(password, this.password)` — securely compares a plain-text password (e.g., from a login form) against the stored hash. It returns `true` if they match, `false` otherwise.
- You **cannot** compare by simply hashing and checking equality — bcrypt hashes include a random salt, so the same plain-text produces a different hash each time. `bcrypt.compare` handles this internally.

---

## 6. Model Creation & Export

```javascript
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
```

- `mongoose.model("user", userSchema)` — compiles the schema into a **Model**. Mongoose will use the name `"user"` to derive the MongoDB collection name (pluralized to `"users"` automatically).
- `module.exports = userModel` — exports the model so it can be imported and used in other files (e.g., controllers, route handlers).

---

## Summary Flow

```
User registers → plain password arrives
        ↓
pre("save") middleware triggers
        ↓
bcrypt hashes the password (10 rounds)
        ↓
Hashed password stored in MongoDB (never plain text)
        ↓
User logs in → comparePassword() called
        ↓
bcrypt.compare() checks plain input vs stored hash
        ↓
Returns true/false → grant or deny access
```