
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Homepage } from "./Homepage";
import { Register } from "./Register";

import AdminDashboard from "../Components/AdminDashboard";
import UserDashboard from "../Components/UserDashboard";
import BookSeat from "../Components/BookSeat";
import AddTrain from "../Components/AddTrain";
import EditTrainModal from "../Components/EditTrainModal";
import UserBookings from "../Components/UserBookings";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/book-seat/:id" element={<BookSeat />} />
      <Route path="/mybooking" element={<UserBookings />} />
      <Route path="/add-train" element={<AddTrain />} />
      {/* <Route path="/edit-train/:id" element={<EditTrainModal />} /> */}
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
export default MainRoutes