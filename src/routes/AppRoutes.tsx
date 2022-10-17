import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutDefault from "../config/layout/Default";
import About from "../pages/About";
import Home from "../pages/home/Home";

const AppRoutes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutDefault component={Home} />} />
          <Route path="/about" element={<LayoutDefault component={About} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
