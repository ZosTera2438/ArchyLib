import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const Navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        fullName: name,
        username: email,
        password,
      });

      if (response.data.message == "Created") {
        toast.success("Registered Successfully");
        return Navigate(`/`);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Email not found");
      } else if (error.response.status === 400) {
        return toast.error("Invalid Password");
      } else {
        return toast.error("An error occurred, try again");
      }
    }
  };

  return (
    <>
      <div className="home">
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
        <div className="login">
          <div className="left">
            <img src="./SignUp.svg" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <h5>Fill Details to Register</h5>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="myLogin">
                <button type="submit">Register</button>
                <Link to="/">Login Now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
