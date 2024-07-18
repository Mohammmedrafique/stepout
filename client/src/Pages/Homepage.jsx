import React from "react";

import { Footer } from "./Footer";
import { Login } from "./Login";
export const Homepage = () => {
  return (
    <div className="w-screenmax-w-screen w-full">
      <Login />
      <Footer />
    </div>
  );
};
