import "../styles/base/utilities.css";
import "../styles/login.css";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);
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
              console.log(e.target.value);
            });
          }}
        />
      </div>
    </section>
  );
};
export default Login;
