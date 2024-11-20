import "../styles/base/utilities.css";
import "../styles/student.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Instructor = ({ instructors }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card-section flex column">
        <div className="flex  justify-center courses">
          {instructors?.map((i) => (
            <div key={i.user_id} className="flex column justify-center">
              <p>
                {i.first_name} {i.last_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Instructor;
