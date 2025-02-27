const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("dado")
        .setDescription("Devuelve un número entre 1 y [max] (por defecto el máximo es 6)")
        ,
	run: async ({ client, interaction }) => {
        let max = 6;    // por defecto 6
        const param = interaction.options.getNumber("max");
        console.log(param); // debug
        if (typeof param !== "undefined") {
            max = param;
        }
        let resultado = Math.floor((Math.random() * max) + 1);
        // CREACION DE LA RESPUESTA
		await interaction.editReply("Ha salio un " + resultado + ", que no ehtá trucao lo juro");
	},
}