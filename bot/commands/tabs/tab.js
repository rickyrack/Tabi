const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tab')
		.setDescription("📜 Create, Remove, or Edit a Tab. 🖊️"),
	async execute(interaction) {

        /*const fortuneEmbed = new EmbedBuilder()
			.setTitle(`${fortune}`)
			.setDescription(`${desc}`)
			.setThumbnail('https://i.imgur.com/fF3Mpac.png')*/

		let msg = await interaction.reply({ content: 'test edit tab' });
	},
};