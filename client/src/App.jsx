import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/User/Home/Home";
import Admin from "./components/Admin/Home/Admin";
import Add from "./components/Admin/AddBook/Add";
import Cart from "./components/User/Cart/Cart";
import ViewBook from "./components/Admin/ViewBook/ViewBook";
import ViewTransactions from "./components/Admin/ViewTransactions/ViewTransactions";
import Signup from "./components/Auth/Signup";
import EditBook from "./components/Admin/ViewBook/EditBook";

function App() {
  const isAutheniticated = () => {
    return localStorage.getItem("token") !== null;
  };
  return (
    <>
      <Routes>
        Auth Routes
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/welcome"
          element={isAutheniticated() ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isAutheniticated() ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={isAutheniticated() ? <Admin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add-new-book"
          element={isAutheniticated() ? <Add /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/view-book"
          element={isAutheniticated() ? <ViewBook /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/edit_book/:bookId"
          element={isAutheniticated() ? <EditBook /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/view-transactions"
          element={isAutheniticated() ? <ViewTransactions /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
