import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Instructor from "./Instructor";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const AssignInstructor = ({ instructors, courses }) => {
  const [error, setError] = useState("");

  const [nonAssignedCourses, setNonAssignedCourses] = useState(
    courses.filter((c) => c.instructor_id === null)
  );
  const [form, setForm] = useState({
    course_id: nonAssignedCourses[0]?.course_id,
    instructor_id: instructors[0]?.user_id,
  });

  //   useEffect(() => {
  //     loadInstructors();
  //   }, []);

  return (
    <>
      <div className="flex gap10 column add-form ">
        <label>Choose an Instructor:</label>
        <select
          name="Instructors"
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

        {console.log("Form is ", form)}
        <button
          onClick={async () => {
            if (!form.course_id || !form.instructor_id) {
              setError("All Fields are required");
              return;
            }
            const data = new FormData();
            data.append("course_id", form.course_id);
            data.append("instructor_id", form.instructor_id);

            try {
              const response = await request({
                body: data,
                method: "POST",
                route: "AssignInstructor",
              });
              if (response.status === 200) {
                console.log("Assigned Instructor");
                setNonAssignedCourses(
                  nonAssignedCourses?.filter(
                    (c) => c.course_id != form.course_id
                  )
                );
                setForm({
                  course_id: null,
                  instructor_id: null,
                });
              }
            } catch (error) {
              setError(error.response.data.message);
              console.log(error.response.data.message);
            }
          }}
        >
          Assign
        </button>

        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default AssignInstructor;
