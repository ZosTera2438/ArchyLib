import React, { useState, useRef } from "react";
import "../AddBook/Add.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAdminTop from "../Home/MyAdminTop";
import { domain } from "@/lib/constants";

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const { bookId } = useParams(); 

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setPublicationYear("");
    setQuantity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${domain}/book/edit/${bookId}`, {
        title,
        author,
        publicationYear,
        quantity,
      });

      if (response.data.message === "success") {
        console.log("Success");
        toast.success("Book Edited Succesfully");
        clearForm();
        navigate("/admin/books");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="admin">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <MyAdminTop />
        <div className="addBook">
          <h5>Edit Book</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Book Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Book Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Book Publication Year"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              required
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBook;
