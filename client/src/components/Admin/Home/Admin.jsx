import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import MyAdminTop from "./MyAdminTop";
import { Link } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const VerifyToken = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.get("http://localhost:8080/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/admin");
      } catch (error) {
        navigate("/");
      }
    };
    VerifyToken();
  }, [navigate]);

  return (
    <>
      <div className="admin">
        <MyAdminTop />
        <div className="admin_body">
          <Link to="/admin/add-new-book">Add New Book</Link>
          <Link to='/admin/view-book'>View Books</Link>
          <Link to="/admin/view-transactions">View Transactions</Link>
        </div>
      </div>
    </>
  );
}

export default Admin;
