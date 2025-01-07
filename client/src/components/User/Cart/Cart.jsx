import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "./Cart.css";
import AdminTop from "../Home/Header";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MinusIcon } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Cart = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]); // Initialize with an empty array
  const [colDefs] = useState([
    { field: "title", headerName: "Title" },
    { field: "author", headerName: "Author" },
    { field: "publicationYear", headerName: "Publication Year" },
    {
      headerName: "Return Book",
      field: "returnBook",
      cellRenderer: (params) => {
        return (
          <div className="py-2">
            <MinusIcon
              color="red"
              className="cursor-pointer "
              onClick={() => removeFromCart(params.data._id)}
            />
          </div>
        );
      },
    },
  ]);
  const defaultColDef = {
    flex: 1,
  };

  useEffect(() => {
    const VerifyToken = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.get("http://localhost:8080/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/cart");
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };

    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/book/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Remove the 'quantity' field from each book
        const cartWithoutQuantity = response.data.cart.map(
          ({ quantity, ...rest }) => rest
        );

        setRowData(cartWithoutQuantity);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
    VerifyToken();
  }, []);

  // Function to remove a book from the cart
  const removeFromCart = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      // Send delete request to the server
      await axios.delete(`http://localhost:8080/book/cart/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the cart state and show success message
      setRowData(rowData.filter((book) => book._id !== bookId));
      toast.success("Book Removed Successfully");
    } catch (error) {
      // Handle error in removing the book
      console.error("Error removing book from cart:", error);
    }
  };

  return (
    <div>
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
      <h2 className="text-center text-3xl my-3 tracking-wider">
        Borrowed Books
      </h2>
      <div className="px-3 my-3 rounded-md">
        <div className="ag-theme-alpine" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData} // Row data from state
            columnDefs={colDefs} // Column definitions
            defaultColDef={defaultColDef} // Default column properties
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
