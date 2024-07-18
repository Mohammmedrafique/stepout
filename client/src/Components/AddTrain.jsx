import React, { useState } from "react";

const AddTrain = () => {
  const [formData, setFormData] = useState({
    trainName: "",
    source: "",
    destination: "",
    totalSeats: "",
    availableSeats: "",
    arrivalTimeAtSource: "",
    arrivalTimeAtDestination: "",
  });

  const {
    trainName,
    source,
    destination,
    totalSeats,
    availableSeats,
    arrivalTimeAtSource,
    arrivalTimeAtDestination,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://stepout-qqiv.onrender.com/api/trains/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": "Hello",
          },
          body: JSON.stringify({
            train_name: trainName,
            source,
            destination,
            seat_capacity: totalSeats,
            available_seats: availableSeats,
            arrival_time_at_source: arrivalTimeAtSource,
            arrival_time_at_destination: arrivalTimeAtDestination,
          }),
        }
      );

      if (response.ok) {
        alert("Train added successfully.");
      } else {
        alert("Failed to add train. Please try again.");
      }
    } catch (error) {
      console.error("Error during train addition:", error);
      alert("An error occurred while adding the train. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Train
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="trainName" className="sr-only">
                Train Name
              </label>
              <input
                id="trainName"
                name="trainName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Train Name"
                value={trainName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="source" className="sr-only">
                Source
              </label>
              <input
                id="source"
                name="source"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Source"
                value={source}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="destination" className="sr-only">
                Destination
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Destination"
                value={destination}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="totalSeats" className="sr-only">
                Total Seats
              </label>
              <input
                id="totalSeats"
                name="totalSeats"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Total Seats"
                value={totalSeats}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="availableSeats" className="sr-only">
                Available Seats
              </label>
              <input
                id="availableSeats"
                name="availableSeats"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Available Seats"
                value={availableSeats}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="arrivalTimeAtSource" className="sr-only">
                Arrival Time at Source
              </label>
              <input
                id="arrivalTimeAtSource"
                name="arrivalTimeAtSource"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Arrival Time at Source"
                value={arrivalTimeAtSource}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="arrivalTimeAtDestination" className="sr-only">
                Arrival Time at Destination
              </label>
              <input
                id="arrivalTimeAtDestination"
                name="arrivalTimeAtDestination"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Arrival Time at Destination"
                value={arrivalTimeAtDestination}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Train
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrain;
