const mongoose = require('mongoose');

const spokenSchema = new mongoose.Schema({
    guildID: Number,
    word: String,
    count: Number
});

module.exports = new mongoose.model('totalWords', spokenSchema);