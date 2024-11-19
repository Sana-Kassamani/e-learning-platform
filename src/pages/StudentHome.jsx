import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Header from "../components/Header";
import Courses from "../components/Courses";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import React, { useState, useEffect } from "react";

const StudentHome = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const response = await request({
      route: "getEnrolledCourses",
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
      <h2>Enrolled Courses</h2>
      <Courses courses={courses} />
    </>
  );
};

export default StudentHome;
