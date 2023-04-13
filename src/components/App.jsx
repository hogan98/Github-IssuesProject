import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Details from "./Details";
import Issues from "./Issues";

export default function App() {
  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Issues />}></Route>

            <Route exact path="/issues/:id" element={<Details />}></Route>
          </Routes>
        </div>
      </>
    </Router>
  );
}
