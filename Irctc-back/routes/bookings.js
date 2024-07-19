const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middlewares/auth");
router.get("/booking/:booking_id",auth,async (req, res) => {
  const { booking_id } = req.params;

  try {
    const booking = await Booking.findById(booking_id).populate("train_id");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      booking_id: booking._id,
      train_id: booking.train_id._id,
      train_name: booking.train_id.train_name,
      user_id: booking.user_id,
      no_of_seats: booking.no_of_seats,
      seat_numbers: booking.seat_numbers,
      arrival_time_at_source: booking.train_id.arrival_time_at_source,
      arrival_time_at_destination: booking.train_id.arrival_time_at_destination,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Specific Booking Details by User ID and Booking ID
router.get("/user/:user_id/booking/:booking_id", async (req, res) => {
  const { user_id, booking_id } = req.params;

  try {
    const booking = await Booking.findOne({
      _id: booking_id,
      user_id,
    }).populate("train_id");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      booking_id: booking._id,
      train_id: booking.train_id._id,
      train_name: booking.train_id.train_name,
      user_id: booking.user_id,
      no_of_seats: booking.no_of_seats,
      seat_numbers: booking.seat_numbers,
      arrival_time_at_source: booking.train_id.arrival_time_at_source,
      arrival_time_at_destination: booking.train_id.arrival_time_at_destination,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get All Bookings for a Specific User
router.get("/book/:user_id",auth, async (req, res) => {
  const { user_id } = req.params;

  try {
    const bookings = await Booking.find({ user_id }).populate("train_id");

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(
      bookings.map((booking) => ({
        booking_id: booking._id,
        train_id: booking.train_id._id,
        train_name: booking.train_id.train_name,
        user_id: booking.user_id,
        no_of_seats: booking.no_of_seats,
        seat_numbers: booking.seat_numbers,
        arrival_time_at_source: booking.train_id.arrival_time_at_source,
        arrival_time_at_destination:
          booking.train_id.arrival_time_at_destination,
      }))
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
