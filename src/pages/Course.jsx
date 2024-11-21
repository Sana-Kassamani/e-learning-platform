import "../styles/base/utilities.css";
import "../styles/student.css";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Course = ({ assignments, announcements }) => {
  const [course, setCourse] = useState({});
  const getCourseContent = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const data = new FormData();
    data.append("course_id", courseId);
    const responseCourse = await request({
      method: "POST",
      body: data,
      route: "getCourse",
    });
    responseCourse.data.course && setCourse(responseCourse.data.course);
  };
  useEffect(() => {
    getCourseContent();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section>
        <div className="course-title flex column justify-end">
          <h1>{course.title}</h1>
          <h4>
            {course.first_name} {course.last_name}
          </h4>
          <h6>{course.description}</h6>
        </div>
        <div className="flex justify-center course-content ">
          <div className="flex column ">
            <h2>Anouncements</h2>
            {announcements?.map((a, index) => (
              <div className="anouncement" key={index}>
                <p>{a.content}</p>
              </div>
            ))}
          </div>
          <div className="flex column ">
            <h2>Assignments</h2>
            {assignments?.map((a, index) => (
              <div className="anouncement" key={index}>
                <p>{a.title}</p>
                <p>{a.due_date}</p>
                <button
                  onClick={() => {
                    localStorage.setItem("assignment", JSON.stringify(a));
                    navigate("/assignment");
                  }}
                >
                  View Instructions
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
