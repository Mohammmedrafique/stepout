import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/trains")
      .then((response) => response.json())
      .then((data) => setTrains(data))
      .catch((error) => console.error("Error fetching train data:", error));
  }, []);

  const handleDelete = async (trainId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/trains/${trainId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": "Hello",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the train");
      }

      setTrains(trains.filter((train) => train._id !== trainId));
    } catch (error) {
      console.error("Error deleting train:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://i.postimg.cc/NfBr6xy3/a-captivating-and-dynamic-image-of-a-bustling-trai-lbx2rn-Sq-Qo2z-X8t-N8xk-NJA-Mhc-Jtls-RT6m-Lj-U-fm4-RD-g.jpg')]">
      <div className="w-full flex justify-between mb-8 px-4">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Admin Dashboard
        </h2>
        <Link
          to="/add-train"
          className="group relative max-w-xs flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Train
        </Link>
      </div>
      <div className="overflow-x-auto w-full px-4">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr className="uppercase text-sm">
              <th className="py-3 px-6 border-b">Source</th>
              <th className="py-3 px-6 border-b">Destination</th>
              <th className="py-3 px-6 border-b">Seats</th>
              <th className="py-3 px-6 border-b">Arrival at Source</th>
              <th className="py-3 px-6 border-b">Arrival at Destination</th>
              <th className="py-3 px-6 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr
                key={train._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-4 px-6 border-b">{train.source}</td>
                <td className="py-4 px-6 border-b">{train.destination}</td>
                <td className="py-4 px-6 border-b">
                  {train.seat_capacity} Total, {train.available_seats} Available
                </td>
                <td className="py-4 px-6 border-b">
                  {train.arrival_time_at_source}
                </td>
                <td className="py-4 px-6 border-b">
                  {train.arrival_time_at_destination}
                </td>
                <td className="py-4 px-6 border-b">
                  <Link
                    to={`/edit-train/${train._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(train._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
