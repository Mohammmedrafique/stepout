const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    train_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    no_of_seats: { type: Number, required: true },
    seat_numbers: { type: [Number], required: true }
}, {
    versionKey: false
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
