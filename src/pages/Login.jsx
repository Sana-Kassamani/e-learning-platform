import "../styles/base/utilities.css";
import "../styles/login.css";
import { request } from "../utils/request";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Login = () => {
  const userTypes = [null, "/admin", "/instructor", "/student"];
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

  const navigate = useNavigate();

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
          onClick={async () => {
            console.log("clicked");
            if (!loginForm.username || !loginForm.password) {
              console.log("empty credentials");
              setError("All fields are required");
              return;
            }
            // const response = verifyLogin();
            const data = new FormData();
            data.append("username", loginForm.username);
            data.append("password", loginForm.password);
            try {
              const response = await request({
                body: data,
                method: "POST",
                route: "verifyLogin",
              });
              if (response.status === 200) {
                const token = response.data.jwt;
                localStorage.setItem("token", token);
                navigate(userTypes[response.data.user_type]);
              }
            } catch (error) {
              setError(error.response.data.message);
              console.log(error.response.data.message);
            }
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
