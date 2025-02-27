const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("peineta").setDescription("pos tu que crees"),
	run: async ({ client, interaction }) => {
        let peineta = "⠀⠀⠀⠀⠀lﾆヽ\n　    　 |= | \n　    　 |_ |\n　　/⌒|~ |⌒i-、\n　 /|　|　|　| ｜\n　｜(　(　(　(　｜\n　｜　　　　　 ｜\n　 ＼　　　　　/\n　　 ＼　　　 |";
        // CREACION DE LA RESPUESTA
		await interaction.editReply(peineta);
	},
}