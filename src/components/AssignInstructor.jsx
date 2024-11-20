import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Instructor from "./Instructor";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const AssignInstructor = ({ instructors, courses }) => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    course_id: null,
    instructor_id: null,
  });

  const [nonAssignedCourses, setNonAssignedCourses] = useState(
    courses.filter((c) => c.instructor_id === null)
  );
  //   useEffect(() => {
  //     loadInstructors();
  //   }, []);

  return (
    <>
      <div className="flex gap10 column add-form ">
        <label>Choose an Instructor:</label>
        <select
          name="Instructors"
          defaultValue="instructor"
          onChange={(e) => {
            setForm((prev) => {
              return {
                ...prev,
                instructor_id: e.target.value,
              };
            });
          }}
        >
          {instructors?.map((i) => (
            <option value={i.user_id} key={i.user_id}>
              {i.first_name} {i.last_name}
            </option>
          ))}
        </select>

        <label>Choose an Instructor:</label>
        <select
          name="Courses"
          defaultValue="course"
          onChange={(e) => {
            setForm((prev) => {
              return {
                ...prev,
                course_id: e.target.value,
              };
            });
          }}
        >
          {nonAssignedCourses?.map((c) => (
            <option value={c.course_id} key={c.course_id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>
      {console.log(form)}
    </>
  );
};

export default AssignInstructor;
