import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Courses = ({ courses, isAdmin, deleteCourse, setEditCourse }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="courses-section flex column">
        <div className="flex  justify-center courses">
          {courses?.map((c) => (
            <div key={c.course_id} className="flex column justify-center">
              <p>{c.title}</p>
              <p>
                {c.first_name} {c.last_name}
              </p>
              <p>{c.description}</p>
              <button
                onClick={() => {
                  navigate(`/course?id=${c.course_id}`);
                }}
              >
                More
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => {
                      console.log(`delete clicked on ${c.course_id} `);
                      deleteCourse(c.course_id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      console.log(`edit clicked on ${c.course_id} `);
                      setEditCourse({
                        course_id: c.course_id,
                        title: c.title,
                        description: c.description,
                      });
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
