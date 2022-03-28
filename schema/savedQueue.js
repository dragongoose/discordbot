const mongoose = require('mongoose');

const savedQueue = new mongoose.Schema({
    userId: Number,
    playlist: Object
});

module.exports = new mongoose.model('savedQueue', savedQueue);