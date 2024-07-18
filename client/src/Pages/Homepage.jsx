import React from "react";
import UserDashboard from "../mainpage/UserDashboard";
import Footer from "./Footer";
import AdminDashboard from "../mainpage/AdminDashboard";

export const Homepage = () => {
  return (
    <div className="w-screenmax-w-screen w-full">
      <UserDashboard />
      <Footer />
    </div>
  );
};
