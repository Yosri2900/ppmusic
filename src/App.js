import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Tutorial from "./pages/Tutorial";
import Questions from "./pages/Questions";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/tutorial" exact element={<Tutorial />}></Route>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/favorites" exact element={<Favorites />}></Route>
        <Route path="/questions" exact element={<Questions />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
