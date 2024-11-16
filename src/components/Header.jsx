import "../styles/base/utilities.css";
import "../styles/header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [name, setName] = useState("");
  function getName() {
    const token = localStorage.getItem("jwtToken");
    const name = axios
      .get("http://localhost/e-learning-platform/getName.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data.name;
        } else {
          console.log("Error getting name");
        }
      })
      .catch((error) => {
        console.log("Server error getting name");
      });
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
      <button>Logout</button>
    </header>
  );
};

export default Header;
