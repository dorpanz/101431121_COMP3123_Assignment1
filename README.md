# Employee Management System

## Description
This is an Employee Management System built using Node.js, Express.js, and MongoDB. The application provides a set of RESTful APIs for managing employee records, allowing users to create, read, update, and delete employee information. It also includes user authentication features.

## Features
- User registration and login
- Employee CRUD operations (Create, Read, Update, Delete)
- Validation of input data
- Error handling and meaningful error messages
- Connection to MongoDB for data persistence

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Validation:** express-validator
- **Authentication:** bcrypt for password hashing

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure your MongoDB connection:
    - Open `server.js` and replace the `DB_URL` with your MongoDB connection string.
    ```javascript
    const DB_URL = "your_mongodb_connection_string";
    ```

4. Start the server:
    ```bash
    npm start
    ```
    
5. The server should now be running on `http://localhost:8081`.
