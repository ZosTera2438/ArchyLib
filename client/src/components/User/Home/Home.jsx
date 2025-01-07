import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";
import AdminTop from "./Header";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, PlusIcon } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

function Home() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]); // Initialize with an empty array
  const [colDefs] = useState([
    { field: "title", headerName: "Title" },
    { field: "author", headerName: "Author" },
    { field: "publicationYear", headerName: "Publication Year" },
    { field: "quantity", headerName: "Books Available" },
    {
      headerName: "Borrow Book",
      field: "borrowBook",
      cellRenderer: (params) => {
        return params.data.quantity > 0 ? (
          <div className="py-2">
            <PlusIcon
              color="gray"
              className="cursor-pointer "
              onClick={() => addToCart(params.data._id)}
            />
          </div>
        ) : (
          <span style={{ color: "red" }}>Out of Stock</span>
        );
      },
    },
  ]);

  const addToCart = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8080/book/cart/add`,
        { bookId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message == "Book added to cart") {
        toast.success("Book added to cart");
      }
    } catch (error) {
      if (error.response.data.message == "Book already in cart") {
        return toast.error("Book already in cart");
      } else {
        return toast.error("Something went wrong");
      }
    }
  };
  const defaultColDef = {
    flex: 1,
  };

  // Fetching data from API using useEffect
  useEffect(() => {
    const VerifyToken = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.get("http://localhost:8080/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/welcome");
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/");
        console.log(response.data);
        setRowData(response.data); // Set the fetched data to rowData
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    VerifyToken();
    fetchBooks();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <AdminTop />
      <h2 className="text-center text-3xl my-3 tracking-wider">Book List</h2>
      <div className="px-3 my-3 rounded-md">
        <div className="ag-theme-alpine" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData} // Row data from state
            columnDefs={colDefs} // Column definitions
            defaultColDef={defaultColDef} // Default column properties
          />
        </div>
      </div>
    </>
  );
}

export default Home;
