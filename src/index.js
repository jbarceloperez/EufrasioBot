const { Client, Events, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');

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
    // console.log(interaction);
    if (interaction.commandName === "ping")
        interaction.reply("como que pin ezo que mierda EEEH");
});
