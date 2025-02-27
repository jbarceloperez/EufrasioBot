const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("insulto").setDescription("te digo verdades a la cara"),
	run: async ({ client, interaction }) => {
        let arr = require("./insultos.json").insultos;
        let res = Math.floor(Math.random() * (arr.length) ) + 1;
        // CREACION DE LA RESPUESTA
		await interaction.editReply("espabila " + arr[res].toLowerCase());
	},
}