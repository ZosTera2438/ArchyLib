import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import MyAdminTop from "../Home/MyAdminTop";
import axios from "axios";
import { domain } from "@/lib/constants";

ModuleRegistry.registerModules([AllCommunityModule]);


const ViewTransactions = () => {
  // State for rows and columns
  const [rowData, setRowData] = useState([]); 
  const [colDefs] = useState([
    { field: "book.title", headerName: "Book Title" },
    { field: "user.fullName", headerName: "User Full Name" },
    { field: "date", headerName: "Date" },
    { field: "type", headerName: "Transaction Type" },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true, 
  };

  // Fetching data from API using useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${domain}/book/transactions`);
        let formattedData = response.data.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));
        console.log(response)
        setRowData(formattedData); // Set the fetched data to rowData
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

export default ViewTransactions;
