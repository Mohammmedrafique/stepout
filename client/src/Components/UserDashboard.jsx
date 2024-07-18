import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Train } from "lucide-react";

const UserDashboard = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [allTrains, setAllTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchAllTrains = async () => {
      try {
        const response = await fetch(
          "https://stepout-psi.vercel.app/api/getall",
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Train Booking Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Source
                </label>
                <select
                  id="source"
                  name="source"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Destination
                </label>
                <select
                  id="destination"
                  name="destination"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <Search className="mr-2 h-5 w-5" />
                Check Availability
              </button>
            </div>
          </form>
        </div>

        {filteredTrains.length > 0 ? (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Available Trains
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrains.map((train) => (
                <div
                  key={train._id}
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <div className="flex items-center mb-4">
                    <Train className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {train.train_name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Available Seats:</span>{" "}
                    {train.available_seats}
                  </p>
                  <Link
                    to={`/book-seat/${train._id}`}
                    className="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                  >
                    Book Seat
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-gray-800">
              No Trains Available
            </p>
            <p className="mt-2 text-gray-600">
              Please try different source and destination combinations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
