const express = require("express");
const router = express.Router();
const Train = require("../models/Train");
const auth = require("../middlewares/auth");
const Booking = require("../models/Booking");

//http://localhost:8080/api/getall
//http://localhost:8080/api/availability?source=jaipur&destination=kota
router.get("/getall", async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Seat Availability
//http://localhost:8080/api/trains/availability?source=Jaipur&destination=Lucknow (Query should be passed)
router.get("/availability", auth, async (req, res) => {
  const { source, destination } = req.query;
  console.log(source, destination);
  try {
    const trains = await Train.find({ source, destination });
    const response = trains.map((train) => ({
      train_id: train._id,
      train_name: train.train_name,
      available_seats: train.available_seats,
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Book a Seat
router.post("/:train_id/book", auth, async (req, res) => {
  const { train_id } = req.params;
  const { user_id, no_of_seats } = req.body;

  try {
    const train = await Train.findById(train_id);

    if (train.available_seats < no_of_seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const seat_numbers = Array.from(
      { length: no_of_seats },
      (_, i) => train.seat_capacity - train.available_seats + i + 1
    );
    const booking = new Booking({
      user_id,
      train_id,
      no_of_seats,
      seat_numbers,
    });
    await booking.save();

    train.available_seats -= no_of_seats;
    await train.save();

    res
      .status(200)
      .json({
        message: "Seat booked successfully",
        booking_id: booking._id,
        seat_numbers,
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
