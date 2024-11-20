import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Header from "../components/Header";
import Courses from "../components/Courses";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import React, { useState, useEffect } from "react";

const AdminHome = () => {
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
  });
  const [edittedCourse, setEditCourse] = useState(false);

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
    if (edittedCourse) {
      setCourseForm({
        title: edittedCourse.title || "",
        description: edittedCourse.description || "",
      });
    }
  }, [edittedCourse]);
  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <>
      <Header />
      <h2>All Courses</h2>
      <Courses
        courses={courses}
        isAdmin={true}
        deleteCourse={deleteCourse}
        setEditCourse={setEditCourse}
      />
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

        {addError && <p>{addError}</p>}
        <button
          onClick={async () => {
            if (!courseForm.title || !courseForm.description) {
              console.log("empty credentials");
              setAddError("All fields are required");
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
                setCourses((prev) => {
                  return [...prev, response.data.inserted_row];
                });
              }
            } catch (error) {
              setAddError(error.response.data.message);
              console.log(error.response.data.message);
            }
          }}
        >
          Add Course
        </button>
      </div>
      {edittedCourse && (
        <div className="flex column add-form ">
          <input
            type="text"
            placeholder="Title of course"
            defaultValue={edittedCourse.title}
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
            defaultValue={edittedCourse.description}
            onChange={(e) => {
              setCourseForm((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />

          {editError && <p>{editError}</p>}

          <button
            onClick={async () => {
              console.log(edittedCourse);
              if (!courseForm.title || !courseForm.description) {
                console.log("empty credentials");
                setEditError("All fields are required");
                return;
              }
              const data = new FormData();
              data.append("title", courseForm.title);
              data.append("description", courseForm.description);
              console.log(edittedCourse.course_id);
              data.append("course_id", edittedCourse.course_id);
              try {
                const response = await request({
                  body: data,
                  method: "POST",
                  route: "editCourse",
                });
                if (response.status === 200) {
                  console.log("Editted Course");
                  loadCourses();
                  setEditCourse(false);
                }
              } catch (error) {
                setEditError(error.response.data.message);
                console.log(error.response.data.message);
              }
            }}
          >
            Edit Course
          </button>
        </div>
      )}
    </>
  );
};

export default AdminHome;
