import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const InstructorCourses = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="courses-section flex column">
        <div className="flex  justify-center courses">
          {courses?.map((c) => (
            <div
              key={c.course_id}
              className="flex column justify-center"
              onClick={() => {
                navigate(`/instructor-course?id=${c.course_id}`);
              }}
            >
              <p>{c.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InstructorCourses;
