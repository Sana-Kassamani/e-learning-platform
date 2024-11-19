import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Course from "./Course";
import { request } from "../utils/request";

const InstructorCourse = () => {
  const [error, setError] = useState("");
  const [course, setCourse] = useState({});
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    due_date: null,
  });
  const [announcement, setAnnouncement] = useState({
    content: "",
  });
  useEffect(() => {}, []);
  return (
    <>
      <Course />
      <section>
        <div className="flex column add-assign ">
          <input
            type="text"
            placeholder="Title of assignment"
            onChange={(e) => {
              setAssignment((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
          <input
            type="text"
            placeholder="Title of assignment"
            onChange={(e) => {
              setAssignment((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
          <input
            type="datetime-local"
            onChange={(e) => {
              setAssignment((prev) => {
                return {
                  ...prev,
                  due_date: e.target.value,
                };
              });
            }}
          />
          {error && <p>{error}</p>}
          <button
            onClick={async () => {
              if (
                !assignment.title ||
                !assignment.description ||
                !assignment.due_date
              ) {
                console.log("empty credentials");
                setError("All fields are required");
                return;
              }
              const urlParams = new URLSearchParams(window.location.search);
              const courseId = urlParams.get("id");
              const data = new FormData();
              data.append("title", assignment.title);
              data.append("description", assignment.description);
              data.append("due_date", assignment.due_date);
              data.append("course_id", courseId);
              try {
                const response = await request({
                  body: data,
                  method: "POST",
                  route: "addAssignment",
                });
                if (response.status === 200) {
                  console.log("Added Assignment");
                }
              } catch (error) {
                setError(error.response.data.message);
                console.log(error.response.data.message);
              }
            }}
          >
            Add
          </button>
        </div>
      </section>
    </>
  );
};

export default InstructorCourse;
