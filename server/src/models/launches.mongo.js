const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
        max: 999,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        ref: 'Planet',
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }
});

// connects launchesSchema with "launches" collection
module.exports = mongoose.model('Launch', launchesSchema);