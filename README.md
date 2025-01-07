# Library Management System.

This is a Library Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). The system supports multiple user logins, authentication, borrow/returning books.

## Features

- **User Authentication**: Secure login and registration for multiple users.
- **User Roles**: Different roles for users (e.g., Admin, User).
- **Admin Dashboard**: Admin can view list of books and transactions made by users.
- **User Dashboard**: User can borrow book from list of books and return the borrowed books.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ArchyLib.git
    cd library-management-system
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```

3. Create a `.env` file in the backend directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=your_port
    ```

4. Start the development servers:
    ```bash
    cd backend
    npm run dev
    cd ../frontend
    npm run start
    ```

