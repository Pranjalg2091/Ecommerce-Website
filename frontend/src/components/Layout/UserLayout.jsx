import React from "react";
import Header from "../Common/Header.jsx";
import Footer from "../Common/Footer.jsx";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/* Header Content */}
      <Header />

      {/* Main Content */}
      <main>
        <Outlet/>
      </main>

      {/* Footer Content */}
      <Footer />
    </>
  );
};

export default UserLayout;