import "./styles/App.css";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="" element="{<Login/>}" />
    </Routes>
  );
}

export default App;
