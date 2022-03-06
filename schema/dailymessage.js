const mongoose = require('mongoose');

const dailymessageSchema = new mongoose.Schema({
    guildID: Number,
    message: String,
    count: Number
});

module.exports = new mongoose.model('dailyMessage', dailymessageSchema);