import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Course = () => {
  const [course, setCourse] = useState({});

  const getCourse = async () => {
    const token = localStorage.getItem("jwtToken");
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const data = new FormData();
    data.append("course_id", courseId);
    const response = await axios.post(
      "http://localhost/e-learning-platform/getCourse.php",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      console.log(response.data.course.announcements);
    }

    if (response.data.course) {
      setCourse(response.data.course);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section>
        <div className="course-title flex column justify-end">
          <h1>{course.name}</h1>
          <h4>{course.instructor}</h4>
        </div>
        <div className="flex justify-center course-content ">
          <div className="flex column ">
            <h2>Anouncements</h2>
            {course.announcements?.map((a, index) => (
              <div className="anouncement" key={index}>
                <p>{a.content}</p>
              </div>
            ))}
          </div>
          <div className="flex column ">
            <h2>Assignments</h2>
            {course.assignments?.map((a, index) => (
              <div className="anouncement" key={index}>
                <p>{a.title}</p>
                <p>{a.due_date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
