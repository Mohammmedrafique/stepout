const express = require("express");
const router = express.Router();
const Train = require("../models/Train");
const adminAuth = require("../middlewares/admin");

// Add a New Train (already defined)
router.post("/trains/create", adminAuth, async (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;

  try {
    const train = new Train({
      train_name,
      source,
      destination,
      seat_capacity,
      available_seats: seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination,
    });
    await train.save();

    res
      .status(200)
      .json({ message: "Train added successfully", train_id: train._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get All Trains
router.get("/trains", async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Train by ID
router.get("/trains/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const train = await Train.findById(id);
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.status(200).json(train);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Train by ID
router.put("/trains/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const train = await Train.findByIdAndUpdate(id, updates, { new: true });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.status(200).json({ message: "Train updated successfully", train });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Train by ID
router.delete("/trains/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const train = await Train.findByIdAndDelete(id);
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.status(200).json({ message: "Train deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
