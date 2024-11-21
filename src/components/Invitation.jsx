import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Invitation = ({ course_id }) => {
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const loadStudents = async () => {
    const data = new FormData();
    data.append("course_id", course_id);
    const response = await request({
      route: "getUninvitedStudents",
      method: "POST",
      body: data,
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
            <div key={s.user_id} className="flex column justify-center">
              <p>
                {s.first_name} {s.last_name}
              </p>
              {error && <p> {error}</p>}
              <button
                onClick={async () => {
                  const data = new FormData();
                  data.append("student_id", s.user_id);
                  data.append("course_id", course_id);
                  const response = await request({
                    route: "inviteStudent",
                    method: "POST",
                    body: data,
                  });
                  console.log(response.data);

                  setStudents((prev) => {
                    return prev.filter((std) => std.user_id != s.user_id);
                  });
                }}
              >
                Invite
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Invitation;
