const Discord = require('discord.js');
const { Player } = require("discord-player");
const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
require('dotenv').config();

const COMMANDS_FOLDER = "commands"
const token = process.env.TOKEN;
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;

// argumento que hace recargar los comandos al bot
const LOAD_SLASH = process.argv[2] == "load"

// elemento cliente
const client = new Discord.Client({ intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.GuildVoiceStates
] });

// colección de comandos slash
client.slashcommands = new Discord.Collection();

// creación del objeto Player
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

// Cargador de ficheros
let commands = [];

// Recorre los ficheros de la carpeta commands 
const slashFiles = fs.readdirSync("src/" + COMMANDS_FOLDER).filter(file => file.endsWith(".js"));
for (const file of slashFiles){
    const fullPath = `${__dirname}/${COMMANDS_FOLDER}/${file}`;
    console.log("📂 Loaded file:", fullPath)  // DEBUG
    const slashcmd = require(fullPath);
    client.slashcommands.set(slashcmd.data.name, slashcmd);
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
}

// Cargar los comandos en el servidor para que aparezcan disponibles
if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(token);
    console.log("\n - LOADING SLASH COMMANDS - ");
    rest.put(Routes.applicationGuildCommands(client_id, guild_id), {body: commands})
    .then(() => {
        console.log("✅ Successfully loaded.\nExiting...");
        process.exit(0);
    })
    .catch((err) => {
        if (err){
            console.log(err);
            process.exit(1);
        }
    })
}
else {  // Ejecución normal del bot, login e implementación del handler de interacciones
    client.on(Discord.Events.ClientReady, () => {
        console.log(`\n✅ Logged in as ${client.user.tag}\n`);
    })
    client.on(Discord.Events.InteractionCreate, (interaction) => {  // al enviarse un mensaje al servidor
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName);
            if (!slashcmd) interaction.reply("mushasho no te entiendo habla normal cohone");

            console.log(`🛠️ New command: [${new Date(Date.now()).toUTCString()}]>${interaction.member.nickname}(${interaction.user.username}): ${interaction}`);
            await interaction.deferReply();
            await slashcmd.run({ client, interaction });
        }
        handleCommand();
    })
    client.login(token);
}
