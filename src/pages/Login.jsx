import "../styles/base/utilities.css";
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

  const navigate = useNavigate();
  function verifyLogin() {
    const data = new FormData();
    data.append("username", loginForm.username);
    data.append("password", loginForm.password);
    const response = axios.post(
      "http://localhost/e-learning-platform/verifyLogin.php",
      data
    );
    return response;
  }

  return (
    <section className=" login-section flex  justify-center align-center">
      <div className=" flex column justify-center ">
        <h2>Welcome</h2>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Username..."
          onChange={(e) => {
            setLoginForm((prev) => {
              return {
                ...prev,
                username: e.target.value,
              };
            });
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password..."
          onChange={(e) => {
            setLoginForm((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            });
          }}
        />
        <button
          onClick={() => {
            console.log("clicked");
            if (!loginForm.username || !loginForm.password) {
              console.log("empty credentials");
              setError("All fields are required");
              return;
            }
            verifyLogin()
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  const token = response.data.jwt;
                  localStorage.setItem("jwtToken", token);
                  console.log("Login successfu");
                  navigate("/home");
                } else {
                  setError("Invalid credentials");
                }
              })
              .catch((error) => {
                console.log("Server error on Login:", error);
              });
          }}
        >
          Submit
        </button>
        {error && <p>{error}</p>}
      </div>
    </section>
  );
};
export default Login;
