import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet /> {/* Dynamic content will be rendered here */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
