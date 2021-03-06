// Copyright 2020 Cytrus-RE Developers
// You may use the code, but please do credit us.

"use strict";

// Check if the Node version is 14+
if (Number(process.version.slice(1).split(".")[0]) < 14) throw new Error("Cytrus-RE requires Node 14 or higher. Re-run the bot with Node 14 or higher.");
if (process.env.PREBOOT) eval(process.env.PREBOOT); // Execute anything in the preboot variable

// Define NPM modules
const Discord = require("discord.js"); // You know what this does.
const Enmap = require("enmap");

// Define client
const client = new Discord.Client({
	disableEveryone: true, // Disable pinging @everyone (BUT WHAT IT DOESN'T WORK!!!!!!!!!!!)
	disabledEvents: ["TYPING_START"] //Don't show that the bot is "typing" 
});

// Define time of startup
client.starttime = new Date(); 

// Define databases/objects
client.profiles = new Enmap({name: "profiles"});
client.logins = new Enmap({name: "logins"});
client.spotify = new Enmap({name: "spotify"});
client.settings = new Enmap({name: "settings"});
client.notes = new Enmap({name: "notes"});
client.bugs = new Enmap({name: "bugreports"});
client.starboard = new Enmap({name: "starboardmid"});
client.warns = new Enmap({name: "warns"});
client.tags = new Enmap({name: "tags"});
client.uses = new Enmap({name: "commandpop"});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.liusers = new Discord.Collection();
client.music = {};
client.levelCache = {};


// Import files
client.logger = require("./src/modules/Logger");
client.config = require("./src/cnf");
client.errors = require("./src/modules/errors");
require("./src/modules/commands")(client); // Import command module
require("./src/modules/events")(client); // Import events module
require("./src/modules/_functions")(client); // Import functions

// Cache the permissions
// This looks weird can't we try to do somehthing about htis
for (let i = 0; i < client.config.permLevels.length; i++) {
	let currentlevel = client.config.permLevels[i];
	client.levelCache[currentlevel.name] = currentlevel.level;
}

// Login to Discord
client.login(process.env.BOT_TOKEN);
console.log("Logged into Discord API!");
// Set status to Loading
//client.user.setStatus("idle");
//client.user.setActivity("Loading...");

// Export the client (Allows other Cytrus-RE things to interact with this)
module.exports = client;
