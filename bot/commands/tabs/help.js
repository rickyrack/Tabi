const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tabi')
		.setDescription("📜 Tabi Command List 👍"),
	async execute(interaction) {

        const helpEmbed = new EmbedBuilder()
			.setTitle('📜 Tabi Help 👍')
			.setDescription('Tabi keeps track of your tabs with friends!')
            .setColor([0, 205, 227])
			.addFields(
                { name: '/tab me', value: 'See and edit all of your active tabs.'},
                { name: '/tab create [tab-name] [@nickname]', value: 'Create a tab with someone.'},
                { name: '/tab me [tab-name]', value: 'Manage a tab. *unusable command*'},
                { name: '/tab [tab-name] clear', value: "Clear out a tab's entries."},
                { name: '/tab [tab-name] remove', value: 'Send a tab to the shadow realm.'},
                { name: '/tab rename [tab-name] [new-tab-name]', value: 'Rename a tab, allowed once every 24 hours.'},
                { name: '/add [tab-name] [ 1.50 | 1 ]', value: 'Add an entry to a tab. Can be a stake or # of wins.'}
            )

		let msg = await interaction.reply({ embeds: [helpEmbed] });
	},
};