import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Instructor = ({ instructors, setInstructors }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeBAN = async (user_id, banned) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("banned", banned);
    try {
      const response = await request({
        body: data,
        method: "POST",
        route: "toggleBanUser",
      });
      if (response.status === 200) {
        console.log("Banned Instructor");
        setInstructors((prev) => {
          return prev.map((e) =>
            e.user_id === user_id ? { ...e, banned } : e
          );
        });
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="card-section flex column">
        <div className="flex  justify-center courses">
          {instructors?.map((i) => (
            <div key={i.user_id} className="flex column justify-center">
              <p>
                {i.first_name} {i.last_name}
              </p>
              {i.banned ? (
                <button
                  onClick={() => {
                    changeBAN(i.user_id, 0);
                  }}
                >
                  Unban
                </button>
              ) : (
                <button
                  onClick={() => {
                    changeBAN(i.user_id, 1);
                  }}
                >
                  Ban
                </button>
              )}
              {error && <p> {error}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Instructor;
