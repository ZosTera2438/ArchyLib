import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import MyAdminTop from "../Home/MyAdminTop";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { domain } from "@/lib/constants";

ModuleRegistry.registerModules([AllCommunityModule]);


const ViewBook = () => {
    const Navigate = useNavigate();
  
  // State for rows and columns
  const [rowData, setRowData] = useState([]); // Initialize with an empty array
  const [colDefs] = useState([
    { field: "title", headerName: "Title" },
    { field: "author", headerName: "Author" },
    { field: "publicationYear", headerName: "Publication Year" },
    { field: "quantity", headerName: "Books Available" },
    // {
    //   headerName: "Edit Book",
    //   field: "editBook",
    //   cellRenderer: (params) => {
    //     return (
    //       <div className="py-2">
    //         <Edit
    //           color="grey"
    //           className="cursor-pointer "
    //           onClick={() => editBook(params.data._id)}
    //         />
    //       </div>
    //     );
    //   },
    // },{
    //   headerName: "Delete Book",
    //   field: "deleteBook",
    //   cellRenderer: (params) => {
    //     return (
    //       <div className="py-2">
    //         <Trash2
    //           color="red"
    //           className="cursor-pointer "
    //           onClick={() => deleteBook(params.data._id)}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true, 
  };

  
  // Function to remove a book from the cart
  const editBook = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      // Send delete request to the server
      await axios.put(`${domain}/book/edit/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (error) {
      // Handle error in removing the book
      console.error("Error removing book from cart:", error);
    }
  };

  
  // Function to remove a book from the cart
  const deleteBook = async (bookId) => {
    const token = localStorage.getItem("token");
console.log(bookId)
    try {
      // Send delete request to the server
      await axios.delete(`${domain}/book/${bookId}`);

      // Update the cart state and show success message
      setRowData(rowData.filter((book) => book._id !== bookId));
      toast.success("Book Removed Successfully");
    } catch (error) {
      // Handle error in removing the book
      console.error("Error removing book:", error);
    }
  };

  // Fetching data from API using useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${domain}/book/`);
        setRowData(response.data); // Set the fetched data to rowData
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <MyAdminTop></MyAdminTop>
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
    </div>
  );
};

export default ViewBook;
