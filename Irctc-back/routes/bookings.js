const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middlewares/auth');

// Get Specific Booking Details
router.get('/:booking_id', auth, async (req, res) => {
    const { booking_id } = req.params;

    try {
        const booking = await Booking.findById(booking_id).populate('train_id');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            booking_id: booking._id,
            train_id: booking.train_id._id,
            train_name: booking.train_id.train_name,
            user_id: booking.user_id,
            no_of_seats: booking.no_of_seats,
            seat_numbers: booking.seat_numbers,
            arrival_time_at_source: booking.train_id.arrival_time_at_source,
            arrival_time_at_destination: booking.train_id.arrival_time_at_destination
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
