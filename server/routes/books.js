import express from "express";
import {
  addBook,
  getBooks,
  getTransactions,
  addToCart,
  deleteBook,
  editBook,
  removeFromCart,
  getCart,
  getCartLength
} from "../controllers/books.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// Admin routes
router.post("/add", addBook);
router.get("/", getBooks);
router.get("/transactions", getTransactions);
router.get("/:bookId", deleteBook);
router.get("/edit/:bookId", editBook);

// Cart routes with authentication 
router.get("/cart", authenticate, getCart); // User views their cart
router.get("/cart/length", authenticate, getCartLength); // User views the number of items in their cart
router.post("/cart/add", authenticate, addToCart); // User adds a book to their cart
router.delete("/cart/:bookId", authenticate, removeFromCart); // User removes a book from their cart

export default router;
