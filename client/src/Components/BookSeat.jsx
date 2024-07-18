import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Train, Ticket, Users, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const BookSeat = () => {
  const { id: trainId } = useParams();
  const navigate = useNavigate();

  const [trainName, setTrainName] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [seats, setSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/trains/${trainId}`
        );
        if (response.ok) {
          const data = await response.json();
          setTrainName(data.train_name);
          setAvailableSeats(data.available_seats);
        } else {
          setError("Failed to fetch train details");
        }
      } catch (error) {
        setError("Error fetching train details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainDetails();
  }, [trainId]);

  const handleBookSeat = async (e) => {
    e.preventDefault();
    if (seats > availableSeats) {
      setError("Not enough seats available.");
      return;
    }
    setIsLoading(true);
    setError("");
    const userId = localStorage.getItem("userid");
    try {
      const response = await fetch(
        `http://localhost:8080/api/${trainId}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_id: userId,
            no_of_seats: seats,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(
          `Seat booked successfully. Booking ID: ${
            data.booking_id
          }. Seat numbers: ${data.seat_numbers.join(", ")}`
        );
        navigate("/mybooking");
      } else {
        const errorData = await response.json();
        setError(`Failed to book seat: ${errorData.message}`);
      }
    } catch (error) {
      setError("An error occurred while booking the seat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <Train className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Book Your Seat
          </h2>
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleBookSeat}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="trainName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Train Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Train className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="trainName"
                  name="trainName"
                  type="text"
                  readOnly
                  className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition duration-150 ease-in-out sm:text-sm"
                  value={trainName}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="availableSeats"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Available Seats
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ticket className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="availableSeats"
                  name="availableSeats"
                  type="number"
                  readOnly
                  className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition duration-150 ease-in-out sm:text-sm"
                  value={availableSeats}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Seats to Book
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="seats"
                  name="seats"
                  type="number"
                  required
                  min="1"
                  max={availableSeats}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition duration-150 ease-in-out sm:text-sm"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Ticket
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
              )}
              {isLoading ? "Booking..." : "Book Seat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookSeat;
