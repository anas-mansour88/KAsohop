// Mainlayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from '../component/Nav';
import Footer from '../component/Footer';

export default function Mainlayout({ toggleMode, currentMode }) {
  return (
    <>
      {/* ⚡ تمريرهم إلى Navbar */}
      <Nav toggleMode={toggleMode} currentMode={currentMode} />
      <Outlet />
      <Footer />
    </>
  );
}