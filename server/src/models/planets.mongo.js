const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
    keplerName:{
        type: String,
        required: true,
    },
});

// connecting planetsSchema with planets collection
module.exports = mongoose.model('Planets', planetsSchema);