const mongoose = require('mongoose');

const guildSettings = new mongoose.Schema({
    guildID: Number,
    settingsJson: Object
});

module.exports = new mongoose.model('guildSettings', guildSettings);