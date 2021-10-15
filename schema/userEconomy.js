const mongoose = require('mongoose');

const userEconomy = new mongoose.Schema({
    userID: Number,
    balance: Number,
    items: Object,
    userstorage: Object
});

module.exports = new mongoose.model('userEconomy', userEconomy);