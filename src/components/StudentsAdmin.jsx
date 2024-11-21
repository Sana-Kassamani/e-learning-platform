import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const StudentsAdmin = () => {
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
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
        setStudents((prev) => {
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
  const loadStudents = async () => {
    const response = await request({
      route: "getAllStudents",
    });
    console.log(response.data);

    setStudents(response.data.students);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <>
      <div className="card-section flex column">
        <div className="flex  justify-center courses">
          {students?.map((s) => (
            <div key={s.user_id} className="flex column align-center">
              <p>
                {s.first_name} {s.last_name}
              </p>
              {s.banned ? (
                <button
                  onClick={() => {
                    changeBAN(s.user_id, 0);
                  }}
                >
                  Unban
                </button>
              ) : (
                <button
                  onClick={() => {
                    changeBAN(s.user_id, 1);
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

export default StudentsAdmin;
