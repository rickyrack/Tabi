const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription("📜 Quickly add an amount to a tab. 🖊️"),
	async execute(interaction) {

        /*const fortuneEmbed = new EmbedBuilder()
			.setTitle(`${fortune}`)
			.setDescription(`${desc}`)
			.setThumbnail('https://i.imgur.com/fF3Mpac.png')*/

		let msg = await interaction.reply({ content: 'test pay tab' });
	},
};