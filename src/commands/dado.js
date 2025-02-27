const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("dado")
        .setDescription("Devuelve un número entre 1 y [max]")
        .addIntegerOption(option => option.setName("max").setDescription("Número máximo del dado (si no se indica, será 6)"))
        ,
	run: async ({ client, interaction }) => {
        let max = 6;    // por defecto 6
        const param = interaction.options.getInteger("max");
        if (param) {
            max = param;
        }
        let resultado = Math.floor((Math.random() * max) + 1);
        // CREACION DE LA RESPUESTA
		await interaction.editReply("Ha salio un " + resultado + ", que no ehtá trucao lo juro");
	},
}