import "./styles/App.css";
import Login from "./pages/Login";
import StudentHome from "./pages/StudentHome";
import InstructorHome from "./pages/InstructorHome";
import { Routes, Route, useLocation } from "react-router-dom";
import Course from "./pages/Course";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<StudentHome />} />
      <Route path="/instructor" element={<InstructorHome />} />
      <Route path="/course" element={<Course />} />
      <Route path="/instructor-course" element={<InstructorCourse />} />
    </Routes>
  );
}

export default App;
