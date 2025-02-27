const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
	run: async ({ client, interaction }) => {
        // CREACION DE LA RESPUESTA
		await interaction.editReply("como que pin ezo que mierda EEEH");
	},
}