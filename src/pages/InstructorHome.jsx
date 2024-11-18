import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Header from "../components/Header";
import InstructorCourses from "../components/InstructorCourses";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const InstructorHome = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get(
      "http://localhost/e-learning-platform/getInstructorCourses.php",
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
      <Header />
      <InstructorCourses courses={courses} />
    </>
  );
};

export default InstructorHome;
