import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="app-container bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content-area p-4">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
