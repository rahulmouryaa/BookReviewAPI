# 📚 Book Review API

This is a RESTful API built with Node.js and Express.js for managing books and their reviews.

---

## 🚀 Features:

* User Authentication with JWT
* CRUD Operations for Books
* Book Search by Title or Author
* Review Functionality (Add, Update, Delete)
* Pagination Support for Books and Reviews

---

## 📂 Project Setup Instructions:

1. **Clone the repository:**

   ```bash
   git clone <your-repo-link>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd BookReviewAPI
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```

5. **Start the server:**

   ```bash
   nodemon app.js
   ```

6. **Server Running:**
   Visit `http://localhost:5000` to access the API.

---

## 🔄 API Endpoints:

### 🔑 **Authentication:**

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| `POST` | `/api/auth/signup` | Register a new user   |
| `POST` | `/api/auth/login`  | Login and get a token |

### 📚 **Books:**

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| `POST` | `/api/books`     | Add a new book (Authenticated only) |
| `GET`  | `/api/books`     | Get all books                       |
| `GET`  | `/api/books/:id` | Get book by ID, including reviews   |

### ✍️ **Reviews:**

| Method   | Endpoint                 | Description                |
| -------- | ------------------------ | -------------------------- |
| `POST`   | `/api/books/:id/reviews` | Submit a review for a book |
| `PUT`    | `/api/reviews/:id`       | Update your own review     |
| `DELETE` | `/api/reviews/:id`       | Delete your own review     |

### 🔎 **Search:**

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| `GET`  | `/api/search` | Search books by title or author |

---

## 📝 How to Test:

1. **Register:** Send a POST request to `/api/auth/signup`
2. **Login:** Send a POST request to `/api/auth/login` and get the token.
3. **Use the token:**
   Add this to headers for protected routes:

   ```
   Authorization: Bearer <token>
   ```
4. **Add, Get, and Search Books:**

   * `/api/books` for adding new books.
   * `/api/books/:id` for getting book details.
   * `/api/search?q=searchTerm` for searching by title or author.

---

## 🗂️ Database Schema:

1. **User Schema:**

   * Username
   * Password (Hashed)

2. **Book Schema:**

   * Title
   * Author
   * Genre
   * Reviews (Array of ObjectIds referencing `Review`)

3. **Review Schema:**

   * User (ObjectId referencing `User`)
   * Book (ObjectId referencing `Book`)
   * Rating
   * Comment

---

## 💡 **Design Decisions & Assumptions:**

* JWT-based authentication for secure API access.
* One user can review a book only once.
* Book search is case-insensitive and supports partial matches.
* Pagination is implemented to handle large data sets efficiently.

---

## 📝 **Example API Requests (Postman / cURL):**

```bash
# Register a User
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'

# Login to get a Token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'

# Get All Books (with Token)
curl -X GET http://localhost:5000/api/books \
  -H "Authorization: Bearer <token>"

# Search for Books
curl -X GET 'http://localhost:5000/api/search?q=Harry&page=1&limit=10'
```

---

