import Book from "../models/Book.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

//addBook
export const addBook = async (req, res) => {
  const { title, author, publicationYear, quantity } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      publicationYear,
      quantity,
    });

    await newBook.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
};

//get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get All Books
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', 'fullName').populate('book', 'title');;
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//deleteBook
export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  // console.log(bookId, "nh")
  try {
    await Book.findByIdAndDelete(bookId);

    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// edit Book
export const editBook = async (req, res) => {
  const { title, author, publicationYear, quantity } = req.body;
  const { bookId } = req.params;
  console.log(bookId, "nh")
  try {
    const book = await Book.findById(bookId);
    book.title = title;
    book.author = author;
    book.publicationYear = publicationYear;
    book.quantity = quantity;

    await book.save(); 

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//// Add book to cart
export const addToCart = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(400).json({ message: "Book Unavailable" });
    }

    // Check if the book has sufficient quantity
    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book out of stock" });
    }

    const user = await User.findById(userId);

    if (user.cart.includes(bookId)) {
      return res.status(400).json({ message: "Book already in cart" });
    }

    user.cart.push(bookId);
    await user.save();

    book.quantity -= 1;
    await book.save();

    const newTransaction = new Transaction({
      user: userId,
      book: bookId,
      type: "borrow",
    });
    await newTransaction.save();
    res.json({ message: "Book added to cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get books in cart
export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("cart");

    res.status(200).json({
      message: "Books in cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartLength = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("cart");

    res.json({ cartLength: user.cart.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove book from cart
export const removeFromCart = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    user.cart = user.cart.filter((id) => id.toString() !== bookId);
    await user.save();

    const book = await Book.findById(bookId);
    book.quantity += 1;
    await book.save();

    const newTransaction = new Transaction({
      user: userId,
      book: bookId,
      type: "return",
    });

    await newTransaction.save();

    res.json({ message: "Book removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};