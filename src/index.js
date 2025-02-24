const { Client, Events, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;
console.log(token);

const client = new Client({ intents: [] });
client.once(Events.ClientReady, c => {
    console.log(`Logging in as ${c.user.username}`);
    const ping = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with 'pong'!");
    client.application.commands.create(ping);
});
client.login(token);

client.on(Events.InteractionCreate, interaction => {
    console.log("\nNueva interacción:")
    console.log(interaction);
    if (interaction.commandName === "ping")
        interaction.reply("como que pin ezo que mierda EEEH");
});
