import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import Instructor from "./Instructor";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AssignInstructor from "./AssignInstructor";
import AddInstructor from "./AddInstructor";

const InstructorsAdmin = ({ courses }) => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);

  const loadInstructors = async () => {
    const response = await request({
      route: "getInstructors",
    });
    console.log(response.data);

    setInstructors(response.data.instructors);
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  return (
    <>
      <Instructor instructors={instructors} setInstructors={setInstructors} />
      <div className="flex align-center justify-center gap10">
        <AddInstructor setInstructors={setInstructors} />
        <AssignInstructor instructors={instructors} courses={courses} />
      </div>
    </>
  );
};

export default InstructorsAdmin;
