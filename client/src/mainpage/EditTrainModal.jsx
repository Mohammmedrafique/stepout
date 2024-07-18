import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditTrainModal = ({ train, isOpen, onClose, onUpdateTrain }) => {
  const [editedTrain, setEditedTrain] = useState(train);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTrain({ ...editedTrain, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/trains/${editedTrain._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": "Hello",
          },
          body: JSON.stringify(editedTrain),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update train");
      }

      onUpdateTrain(editedTrain);
      onClose();
    } catch (error) {
      console.error("Error updating train:", error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
        <h3 className="text-lg font-bold mb-4">Edit Train</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Source</label>
            <input
              type="text"
              name="source"
              value={editedTrain.source}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              name="destination"
              value={editedTrain.destination}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Seat Capacity</label>
            <input
              type="number"
              name="seat_capacity"
              value={editedTrain.seat_capacity}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Available Seats</label>
            <input
              type="number"
              name="available_seats"
              value={editedTrain.available_seats}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Arrival Time at Source</label>
            <input
              type="text"
              name="arrival_time_at_source"
              value={editedTrain.arrival_time_at_source}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Arrival Time at Destination</label>
            <input
              type="text"
              name="arrival_time_at_destination"
              value={editedTrain.arrival_time_at_destination}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainModal;
