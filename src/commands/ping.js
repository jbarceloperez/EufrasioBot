const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
	run: async ({ client, interaction }) => {
		
        // BASE DE LA LOGICA DE LA RESPUESTA
        console.log("ping");

        // CREACION DE LA RESPUESTA
		await interaction.editReply("como que pin ezo que mierda EEEH");
	},
}