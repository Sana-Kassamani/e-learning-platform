import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const StudentAssignment = () => {
  const [error, setError] = useState("");

  const [comment, setComment] = useState({
    content: "",
    is_private: true,
    studnet_id: null,
    assignment_id: null,
  });
  //   const [course, setCourse] = useState({});
  //   const getCourseContent = async () => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const courseId = urlParams.get("id");
  //     const data = new FormData();
  //     data.append("course_id", courseId);
  //     const responseCourse = await request({
  //       method: "POST",
  //       body: data,
  //       route: "getCourse",
  //     });
  //     responseCourse.data.course && setCourse(responseCourse.data.course);
  //   };
  //   useEffect(() => {
  //     getCourseContent();
  //   }, []);
  const assignment = JSON.parse(localStorage.getItem("assignment"));
  const [submission, setSubmission] = useState({
    assignment_id: assignment.assignment_id,
    file: null,
  });
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section>
        <div className="anouncement">
          <p>{assignment.title}</p>
          <p>{assignment.due_date}</p>
        </div>
        <div className="add-form">
          <input
            type="file"
            placeholder="Attachment"
            onChange={(e) => {
              console.log(e);
              setSubmission((prev) => {
                return {
                  ...prev,
                  file: e.target.value,
                };
              });
            }}
          />
          {console.log(submission)}
          <button
            onClick={async () => {
              if (!submission.file) {
                setError("All fields are required");
                return;
              }
              const data = new FormData();
              data.append("assignment_id", submission.assignment_id);
              data.append("file", submission.file);
              try {
                const response = await axios.post(
                  "http://localhost/e-learning-platform/submitAssignment.php",
                  data,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: localStorage.token,
                    },
                  }
                );
                if (response.status === 200) {
                  console.log("Submitted assignment");
                  console.log(response);
                  console.log(response.data.inserted_row);
                }
              } catch (error) {
                setError(error.response.data.message);
                console.log(error.response.data.message);
              }
            }}
          >
            Submit
          </button>
          <p>Post a comment</p>
          <input
            type="text"
            placeholder="Add a comment"
            value={comment.content}
            onChange={(e) => {
              setComment((prev) => {
                return {
                  ...prev,
                  content: e.target.value,
                };
              });
            }}
          />
          <label>Private</label>
          <input
            type="radio"
            name="type"
            value="private"
            checked={comment.is_private === true}
            onChange={(e) => {
              setComment((prev) => {
                return {
                  ...prev,
                  is_private: true,
                };
              });
            }}
          />
          <label>Public</label>
          <input
            type="radio"
            name="type"
            value="public"
            checked={comment.is_private === false}
            onChange={(e) => {
              setComment((prev) => {
                return {
                  ...prev,
                  is_private: false,
                };
              });
            }}
          />
          <button
            onClick={async () => {
              if (!comment.content) {
                setError("All fields are required");
                return;
              }
              const data = new FormData();
              data.append("content", comment.content);
              data.append("is_private", comment.is_private);
              data.append("assignment_id", assignment.assignment_id);
              try {
                const response = await request({
                  body: data,
                  method: "POST",
                  route: "addComment",
                });
                if (response.status === 200) {
                  console.log("Added Comment");
                  setComment({
                    content: "",
                    is_private: true,
                    studnet_id: null,
                    assignment_id: null,
                  });
                  //   setComments((prev) => {
                  //     return [...prev, response.data.inserted_row];
                  //   });
                }
              } catch (error) {
                setError(error?.response?.data?.message);
                console.log(error?.response?.data?.message || error);
              }
            }}
          >
            Send
          </button>
          {error && <p>{error}</p>}
        </div>
      </section>
    </>
  );
};

export default StudentAssignment;
