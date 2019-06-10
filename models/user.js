const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const fastSchema = new Schema({
    name: String,
    foods: [String],
    startTime: {
        type: Date,
        default: function() {
            return new Date(moment().add(-7, 'hours').format());
        }
    },
    endTime: Date
});

const userSchema = new Schema({
    googleId: String,
    email: String,
    activeFast: {
        type: fastSchema,
        default: {
            name: "none",
            food: []
        }
    },
    prevFasts: [fastSchema]
});

module.exports = mongoose.model('User', userSchema);