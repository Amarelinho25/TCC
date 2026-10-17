import Home from "./telas/Home.jsx";
import react from "react";
import PagStands from "./telas/PagStands.jsx";
import PagPersonagens from "./telas/PagPerson.jsx";
import PagAnime from "./telas/PagAnime.jsx";
import PagHistoria from "./telas/PagHistoria";
import "./App.css";
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stands" element={<PagStands />} />
      <Route path="/personagens" element={<PagPersonagens />} />
      <Route path="/anime" element={<PagAnime />} />
      <Route path="/historia" element={<PagHistoria />} />
    </Routes>
  );
}

