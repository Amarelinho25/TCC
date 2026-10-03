import Home from "./telas/Home.jsx";
import react from "react";
import PagStands from "./telas/PagStands.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stands" element={<PagStands />} />
    </Routes>
  );
}

