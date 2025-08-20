import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content-area">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
