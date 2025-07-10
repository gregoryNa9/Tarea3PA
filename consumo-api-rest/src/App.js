import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from "./components/Formulario";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default App;
