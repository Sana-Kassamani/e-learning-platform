import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Instructor from "./Instructor";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AssignInstructor from "./AssignInstructor";

const AddInstructor = ({ setInstructors }) => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  return (
    <>
      <div className="flex column add-form ">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setForm((prev) => {
              return {
                ...prev,
                username: e.target.value,
              };
            });
          }}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setForm((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            });
          }}
        />
        <input
          type="text"
          placeholder="First Name of Instructor"
          onChange={(e) => {
            setForm((prev) => {
              return {
                ...prev,
                first_name: e.target.value,
              };
            });
          }}
        />
        <input
          type="text"
          placeholder="Last Name of Instructor"
          onChange={(e) => {
            setForm((prev) => {
              return {
                ...prev,
                last_name: e.target.value,
              };
            });
          }}
        />

        {error && <p>{error}</p>}
        <button
          onClick={async () => {
            for (let i in form) {
              if (!i) {
                console.log("empty credentials");
                setError("All fields are required");
                return;
              }
            }
            const data = new FormData();
            data.append("first_name", form.first_name);
            data.append("last_name", form.last_name);
            data.append("username", form.username);
            data.append("password", form.password);
            try {
              const response = await request({
                body: data,
                method: "POST",
                route: "addInstructor",
              });
              if (response.status === 200) {
                console.log("Added Instructor");
                setInstructors((prev) => {
                  return [...prev, response.data.inserted_row];
                });
              }
            } catch (error) {
              setError(error.response.data.message);
              console.log(error.response.data.message);
            }
          }}
        >
          Add Instructor
        </button>
      </div>
    </>
  );
};

export default AddInstructor;
