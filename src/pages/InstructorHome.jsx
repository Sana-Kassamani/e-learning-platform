import "../styles/base/utilities.css";
import "../styles/student.css";
import { request } from "../utils/request";
import Header from "../components/Header";
import InstructorCourses from "../components/InstructorCourses";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const InstructorHome = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const response = await request({
      route: "getInstructorCourses",
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
      <InstructorCourses courses={courses} />
    </>
  );
};

export default InstructorHome;
