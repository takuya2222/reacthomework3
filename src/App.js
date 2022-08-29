import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path={`/register`} element={<Register />} />
          <Route path={`/login`} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
