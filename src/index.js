const Discord = require('discord.js');
const { token } = require('./config.json');
// const dotenv = require('dotenv');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('@discord-api-types/v9');
// const fs = require('fs');
// const { Player } = require('discord-player');

const TOKEN = token;
console.log(TOKEN);
const client = new Discord.Client({ intents: [] });
client.login(TOKEN);
