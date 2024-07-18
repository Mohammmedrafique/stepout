import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [allTrains, setAllTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch all trains when the component mounts
    const fetchAllTrains = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trains", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAllTrains(data);
          setFilteredTrains(data);
          const uniqueSources = [...new Set(data.map((train) => train.source))];
          const uniqueDestinations = [
            ...new Set(data.map((train) => train.destination)),
          ];
          setSources(uniqueSources);
          setDestinations(uniqueDestinations);
        } else {
          alert("Failed to fetch trains. Please try again.");
        }
      } catch (error) {
        console.error("Error during fetching trains:", error);
        alert("An error occurred while fetching trains. Please try again.");
      }
    };

    fetchAllTrains();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allTrains.filter(
      (train) =>
        train.source.toLowerCase() === source.toLowerCase() &&
        train.destination.toLowerCase() === destination.toLowerCase()
    );
    setFilteredTrains(filtered);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Serach your Train
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSearch}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="source" className="sr-only">
                Source
              </label>
              <select
                id="source"
                name="source"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Select Source</option>
                {sources.map((sourceOption) => (
                  <option key={sourceOption} value={sourceOption}>
                    {sourceOption}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="destination" className="sr-only">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select Destination</option>
                {destinations.map((destinationOption) => (
                  <option key={destinationOption} value={destinationOption}>
                    {destinationOption}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Check Availability
            </button>
          </div>
        </form>
        {filteredTrains.length > 0 ? (
          <div className="mt-8 space-y-6">
            <h3 className="text-center text-2xl font-extrabold text-gray-900">
              Available Trains
            </h3>
            <ul className="space-y-4">
              {filteredTrains.map((train) => (
                <li
                  key={train.train_id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <p>
                    <strong>Train:</strong> {train.train_name}
                  </p>
                  <p>
                    <strong>Available Seats:</strong> {train.available_seats}
                  </p>
                  <Link
                    to="/book-seat"
                    className="mt-2 inline-block text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Book Seat
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-8 text-center text-2xl font-extrabold text-gray-900">
            No Trains Available
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
