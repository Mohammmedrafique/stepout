import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookSeat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const trainId = params.get("trainId");
  const trainName = params.get("trainName");
  const availableSeats = params.get("availableSeats");

  const [seats, setSeats] = useState(1);

  const handleBookSeat = async (e) => {
    e.preventDefault();
    if (seats > availableSeats) {
      alert("Not enough seats available.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/user/book-seat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ trainId, seats }),
      });

      if (response.ok) {
        alert("Seat booked successfully.");
        navigate("/user");
      } else {
        alert("Failed to book seat. Please try again.");
      }
    } catch (error) {
      console.error("Error during seat booking:", error);
      alert("An error occurred while booking the seat. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Book Seat
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleBookSeat}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="trainName" className="sr-only">
                Train Name
              </label>
              <input
                id="trainName"
                name="trainName"
                type="text"
                readOnly
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={trainName}
              />
            </div>
            <div>
              <label htmlFor="seats" className="sr-only">
                Number of Seats
              </label>
              <input
                id="seats"
                name="seats"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Number of Seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Seat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookSeat;
