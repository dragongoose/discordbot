const levelfunc2 = require("../utils/levelfunc2");
const levelfunc = require("../utils/levelfunc");
const client = require("../index");
const Levels = require("discord-xp");
const config = require("../config.json")
const mongoose = require('mongoose');
mongoose.connect(config.dburl, { useNewUrlParser: true, useUnifiedTopology: true });

client.on("ready", () =>
    console.log(`${client.user.tag} is up and ready to go!`)
);
