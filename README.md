# 📚 Book Review API

This is a RESTful API built with Node.js and Express.js for managing books and their reviews.

## 🚀 Features:
- User Authentication with JWT
- CRUD Operations for Books
- Book Search by Title or Author

---

## 📂 **Project Setup Instructions**
1. Clone the repository:
   git clone <your-repo-link>

2. Navigate to the project directory:
   cd BookReviewAPI

3. Install the dependencies:
   npm install

4. Create a \`.env\` file in the root folder and add the following:
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000

5. Start the server:
   nodemon app.js

---

## 🔄 **API Endpoints**
| Method | Endpoint          | Description                             |
|---------|-------------------|----------------------------------------|
| POST   | /api/auth/signup  | Register a new user                    |
| POST   | /api/auth/login   | Login and get a token                  |
| POST   | /api/books        | Add a new book (Authenticated only)    |
| GET    | /api/books        | Get all books                          |
| GET    | /api/books/:id    | Get book by ID                         |
| GET    | /api/search       | Search books by title or author        |

---

## 📝 **How to Test:**
1. Register: Send a POST request to \`/api/auth/signup\`
2. Login: Send a POST request to \`/api/auth/login\` and get the token.
3. Use the token in headers for protected routes:
   Authorization: Bearer <token>
4. Add Books, Get Books, and Search with the respective endpoints.
`);

