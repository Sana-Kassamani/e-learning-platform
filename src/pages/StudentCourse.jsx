import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Course from "./Course";
import { request } from "../utils/request";

const StudentCourse = () => {
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  const getCourseContent = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const data = new FormData();
    data.append("course_id", courseId);
    const responseAssign = await request({
      method: "POST",
      body: data,
      route: "getAssignments",
    });
    const responseAnnoun = await request({
      method: "POST",
      body: data,
      route: "getAnnouncements",
    });
    responseAssign.data.assignments &&
      setAssignments(responseAssign.data.assignments);
    responseAnnoun.data.announcements &&
      setAnnouncements(responseAnnoun.data.announcements);
  };
  useEffect(() => {
    getCourseContent();
  }, []);
  return (
    <>
      <Course assignments={assignments} announcements={announcements} />
    </>
  );
};

export default StudentCourse;
