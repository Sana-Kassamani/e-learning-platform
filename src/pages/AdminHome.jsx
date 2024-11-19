import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Header from "../components/Header";
import Courses from "../components/Courses";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import React, { useState, useEffect } from "react";

const AdminHome = () => {
  const { error, setError } = useState("");
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
  });

  const loadCourses = async () => {
    const response = await request({
      route: "getAllCourses",
    });
    console.log(response.data);

    setCourses(response.data.courses);
  };

  const deleteCourse = async (course_id) => {
    const data = new FormData();
    data.append("course_id", course_id);
    const response = await request({
      route: "deleteCourse",
      method: "POST",
      body: data,
    });
    console.log(response.data.message);
    loadCourses();
  };
  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <>
      <Header />
      <h2>All Courses</h2>
      <Courses courses={courses} isAdmin={true} deleteCourse={deleteCourse} />
      <div className="flex column add-form ">
        <input
          type="text"
          placeholder="Title of course"
          onChange={(e) => {
            setCourseForm((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            });
          }}
        />
        <input
          type="text"
          placeholder="Description of course"
          onChange={(e) => {
            setCourseForm((prev) => {
              return {
                ...prev,
                description: e.target.value,
              };
            });
          }}
        />

        {error && <p>{error}</p>}
        <button
          onClick={async () => {
            if (!courseForm.title || !courseForm.description) {
              console.log("empty credentials");
              setError("All fields are required");
              return;
            }
            const data = new FormData();
            data.append("title", courseForm.title);
            data.append("description", courseForm.description);
            try {
              const response = await request({
                body: data,
                method: "POST",
                route: "addCourse",
              });
              if (response.status === 200) {
                console.log("Added Course");
                loadCourses();
              }
            } catch (error) {
              setError(error.response.data.message);
              console.log(error.response.data.message);
            }
          }}
        >
          Add Course
        </button>
      </div>
    </>
  );
};

export default AdminHome;
