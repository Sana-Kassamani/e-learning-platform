import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Header from "../components/Header";
import EnrolledCourses from "../components/EnrolledCourses";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const StudentHome = () => {
  return (
    <>
      <Header />
      <EnrolledCourses />
    </>
  );
};

export default StudentHome;
