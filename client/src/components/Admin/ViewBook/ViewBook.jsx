import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import MyAdminTop from "../Home/MyAdminTop";
import axios from "axios";

ModuleRegistry.registerModules([AllCommunityModule]);


const ViewBook = () => {
  // State for rows and columns
  const [rowData, setRowData] = useState([]); // Initialize with an empty array
  const [colDefs] = useState([
    { field: "title", headerName: "Title" },
    { field: "author", headerName: "Author" },
    { field: "publicationYear", headerName: "Publication Year" },
    { field: "quantity", headerName: "Books Available" },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true, 
  };

  // Fetching data from API using useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/");
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
