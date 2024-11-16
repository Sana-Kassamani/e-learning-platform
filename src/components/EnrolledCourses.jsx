import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  const loadCourses = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get(
      "http://localhost/e-learning-platform/getEnrolledCourses.php",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    setCourses(response.data.courses);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <>
      <div className="courses-section flex column">
        <h2>Enrolled Courses</h2>
        <div className="flex  justify-center courses">
          {courses?.map((c) => (
            <div
              key={c.course_id}
              className="flex column justify-center"
              onClick={() => {
                navigate(`/course?id=${c.course_id}`);
              }}
            >
              <p>{c.name}</p>
              <p>{c.instructor}</p>
              <p>===========</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;
