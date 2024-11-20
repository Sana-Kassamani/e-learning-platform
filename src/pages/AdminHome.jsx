import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Header from "../components/Header";
import CoursesAdmin from "../components/CoursesAdmin";
import InstructorsAdmin from "../components/InstructorsAdmin";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import React, { useState, useEffect } from "react";

const options = {
  1: "Courses",
  2: "Instructors",
  3: "Students",
};
const AdminHome = () => {
  const [option, setOption] = useState("");
  const [courses, setCourses] = useState([]);
  const loadCourses = async () => {
    const response = await request({
      route: "getAllCourses",
    });
    console.log(response.data);

    setCourses(response.data.courses);
  };
  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <>
      <Header />
      <div className="flex align-center tabs">
        <button
          onClick={() => {
            setOption(options[1]);
          }}
        >
          Show Courses
        </button>
        <button
          onClick={() => {
            setOption(options[2]);
          }}
        >
          Show Instructors
        </button>
        <button
          onClick={() => {
            setOption(options[3]);
          }}
        >
          Show Students
        </button>
      </div>

      {option === options[1] && (
        <CoursesAdmin courses={courses} setCourses={setCourses} />
      )}
      {option === options[2] && <InstructorsAdmin courses={courses} />}
      {/* <Courses
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
                  setCourses((prev) => {
                    return prev.map((c) => {
                      if (c.course_id === edittedCourse.course_id) {
                        return {
                          ...c,
                          title: courseForm.title,
                          description: courseForm.description,
                        };
                      } else {
                        return c;
                      }
                    });
                  });
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
      )} */}
    </>
  );
};

export default AdminHome;
