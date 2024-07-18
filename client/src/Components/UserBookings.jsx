import React, { useState, useEffect } from "react";
import { Ticket, Calendar, Clock, Users, Hash } from "lucide-react";

const UserBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await fetch(
          `https://stepout-psi.vercel.app/api/book/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAllBookings(data);
        } else {
          alert("Failed to fetch bookings. Please try again.");
        }
      } catch (error) {
        console.error("Error during fetching bookings:", error);
        alert("An error occurred while fetching bookings. Please try again.");
      }
    };

    fetchAllBookings();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
          My Bookings
        </h1>

        {allBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <Ticket className="mx-auto h-16 w-16 text-purple-500 mb-4" />
            <p className="text-xl text-gray-600">You have no bookings yet.</p>
            <p className="mt-2 text-gray-500">
              When you book a train, your reservations will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allBookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="bg-purple-600 text-white p-4">
                  <h2 className="text-xl font-semibold">
                    {booking.train_name}
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center">
                    <Ticket className="h-5 w-5 text-purple-500 mr-2" />
                    <p className="text-gray-600">
                      <span className="font-medium">Booking ID:</span>{" "}
                      {booking.booking_id}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <p className="text-gray-600">
                      <span className="font-medium">Seats:</span>{" "}
                      {booking.no_of_seats}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-purple-500 mr-2" />
                    <p className="text-gray-600">
                      <span className="font-medium">Arrival at source:</span>{" "}
                      {booking.arrival_time_at_source}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                    <p className="text-gray-600">
                      <span className="font-medium">
                        Arrival at destination:
                      </span>{" "}
                      {booking.arrival_time_at_destination}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-5 w-5 text-purple-500 mr-2" />
                    <p className="text-gray-600">
                      <span className="font-medium">Seat numbers:</span>{" "}
                      {booking.seat_numbers.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
