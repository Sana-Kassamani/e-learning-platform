import "./styles/App.css";
import Login from "./pages/Login";
import StudentHome from "./pages/StudentHome";
import { Routes, Route, useLocation } from "react-router-dom";
import Course from "./pages/Course";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<StudentHome />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
}

export default App;
