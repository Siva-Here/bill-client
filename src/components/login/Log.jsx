import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './log.css';

const Log = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
  const navigate = useNavigate(); // useNavigate hook for navigation

  const sanitizeInput = (input) => {
    let sanitizedInput = input.trim();
    sanitizedInput = sanitizedInput
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    return sanitizedInput;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when submitting form

    const sanitizedFormData = {
      username: sanitizeInput(formData.username),
      password: sanitizeInput(formData.password),
    };

    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedFormData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid Username or Password");
      }
      return response.json();
    })
    .then((data) => {
      toast.success(`Login Successful! Welcome, ${data.username}`); // Display success message using Toastify
      setIsLogin(true);
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('username', data.username);
      setTimeout(()=>{
        navigate('/user'); // Navigate to '/user' page on successful login
      }, 2000);
    })
    .catch((error) => {
      toast.error(error.message); // Display error message using Toastify
    })
    .finally(() => {
      setIsLoading(false); // Set loading state to false when submission is complete
    });
  };

  return (
    <>
      <h1 className="mb-4 display-5 text-white text-center fw-bold fst-italic">Bill Management System</h1>
      <ToastContainer /> {/* ToastContainer for displaying Toastify messages */}

      {!isLogin && (
        <div className="flex flex-column mx-auto px-4 py-3 rounded-2 siva">
          <h1 className="text-center signup">
            <RiAccountCircleFill className="icon" /> Sign In
          </h1>
          <br />
          <form onSubmit={handleSubmit} className="p-1">
            <div className="mb-2">
              <MdEmail className=" username" />
              <label
                htmlFor="exampleInputEmail1"
                className=" pt-1 form-label username"
              >
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="username"
                aria-describedby="emailHelp"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div id="emailHelp" className="pt-2 form-text text-white">
                We'll never share your username with anyone else.
              </div>
            </div>
            <div className="mt-4">
              <RiLockPasswordFill className="text-white" />
              <label
                htmlFor="exampleInputPassword1"
                className=" text-white form-label"
              >
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaRegEye className="text-white" />
                  ) : (
                    <BsEye className="text-white" />
                  )}
                </button>
              </div>
            </div>
            <div className="justify-content-between d-flex">
              {isLoading ? ( // Display spinner if loading state is true
                <div className="spinner-border text-primary text-center ms-auto me-auto mt-5" role="status">
                  <span className="visually-hidden ms-auto me-auto my-5">Loading...</span>
                </div>
              ) : ( // Display submit button if loading state is false
                <button type="submit" className="btn btn-outline-primary ms-auto me-auto mt-5">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      
    </>
  );
};

export default Log;
