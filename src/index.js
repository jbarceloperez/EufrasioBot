const Discord = require('discord.js');
const { Player } = require("discord-player");
const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
require('dotenv').config();

const COMMANDS_FOLDER = "src/commands"
const token = process.env.TOKEN;
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;

// argumento que hace recargar los comandos al bot
const LOAD_SLASH = process.argv[2] == "load"

// elemento cliente
const client = new Discord.Client({ intents: ["Guilds", "GuildVoiceStates"] });

// colección de comandos slash
client.slashcommands = new Discord.Collection();

// creación del objeto Player
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

// Cargador de comandos
let commands = [];

const slashFiles = fs.readdirSync(COMMANDS_FOLDER).filter(file => file.endsWith(".js"));
for (const file of slashFiles){
    console.log(file);
    const slashcmd = require(`${COMMANDS_FOLDER}/${file}`);
    client.slashcommands.set(slashcmd.data.name, slashcmd);
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
}


if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(token)
    console.log(" - LOADING SLASH COMMANDS - ")
    rest.put(Routes.applicationGuildCommands(client_id, guild_id), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("mushasho no te entiendo habla normal cohone")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(token)
}

// client.once(Events.ClientReady, c => {
//     console.log(`Logging in as ${c.user.username}`);
//     const ping = new SlashCommandBuilder()
//         .setName("ping")
//         .setDescription("Replies with 'pong'!");
//     client.application.commands.create(ping);
// });
// client.login(token);

// client.on(Events.InteractionCreate, interaction => {
//     console.log("\nNueva interacción:")
//     console.log(interaction);
//     if (interaction.commandName === "ping")
//         interaction.reply("como que pin ezo que mierda EEEH");
// });
