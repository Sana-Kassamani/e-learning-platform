import "../styles/base/utilities.css";
import "../styles/header.css";
import { request } from "../utils/request";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  async function getName() {
    try {
      const response = await request({
        route: "getName",
      });
      if (response.status === 200) {
        return response.data.name;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    return name;
  }
  useEffect(() => {
    const fetchName = async () => {
      const name = await getName();
      if (name) {
        setName(name);
      }
    };

    fetchName();
  }, []);
  return (
    <header className="flex space-between">
      <h2>Hello, {name}</h2>
      <button
        onClick={() => {
          localStorage.removeItem("jwtToken");
          navigate("/");
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
