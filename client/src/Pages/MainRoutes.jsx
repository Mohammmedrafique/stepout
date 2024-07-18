// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { Login } from "./Login";
// import { Homepage } from "./Homepage";
// import { Register } from "./Register";

// import AdminDashboard from "../mainpage/AdminDashboard";
// import UserDashboard from "../mainpage/UserDashboard";
// import BookSeat from "../mainpage/BookSeat";
// import AddTrain from "../mainpage/AddTrain";
// import EditTrainModal from "../mainpage/EditTrainModal";
// export const MainRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/admin" element={<AdminDashboard />} />
//       <Route path="/user" element={<UserDashboard />} />
//       <Route path="/book-seat" element={<BookSeat />} />
//       <Route path="/add-train" element={<AddTrain />} />
//       <Route path="/edit-train:id" element={<EditTrainModal />} />
//       <Route path="/" element={<Homepage />}></Route>
//       <Route path="/login" element={<Login />}></Route>
//       <Route path="/register" element={<Register />}></Route>
//     </Routes>
//   );
// };
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Homepage } from "./Homepage";
import { Register } from "./Register";

import AdminDashboard from "../mainpage/AdminDashboard";
import UserDashboard from "../mainpage/UserDashboard";
import BookSeat from "../mainpage/BookSeat";
import AddTrain from "../mainpage/AddTrain";
import EditTrainModal from "../mainpage/EditTrainModal";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/book-seat" element={<BookSeat />} />
      <Route path="/add-train" element={<AddTrain />} />
      <Route path="/edit-train" element={<EditTrainModal />} /> {/* Fixed the path */}
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};