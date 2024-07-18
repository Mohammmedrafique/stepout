import React from "react";
import UserDashboard from "../Components/UserDashboard";
import Footer from "./Footer";

export const Homepage = () => {
  return (
    <div className="w-screenmax-w-screen w-full">
      <UserDashboard />
      <Footer />
    </div>
  );
};
