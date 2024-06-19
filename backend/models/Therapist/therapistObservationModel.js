const mongoose = require("mongoose");

const therapistObservationModel = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title of observation"]
    },

    clientId : {
        type: String,
    },

    description : {
        type: String,
    },
    dateModified: {
        type: Date,
        default: Date.now,
    }
})

const TherapistObservation = mongoose.model("therapistObservation", therapistObservationModel);
module.exports = TherapistObservation;