const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const getTabs = require('../../../backend/firestore/tabs/getTabs');
const addEntry = require('../../../backend/firestore/tabs/addEntry');
const genTab = require('../../helper/tabs/genTab');
const genError = require('../../helper/genError');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription("📜 Add an entry to a Tab. 🖊️")
        .addStringOption(option =>
			option.setName('name')
				.setDescription("What tab do you want to add to?")
				.setRequired(true)
				.setAutocomplete(true))
		.addUserOption(option =>
			option.setName('winner')
			.setDescription('Who won this time?')
			.setRequired(true))
        .addNumberOption(option =>
            option.setName('stake')
                .setDescription("Default stake is $0.01! 💸(Ex: 1.50/10/7.24)")
                .setRequired(false))
		.addNumberOption(option =>
				option.setName('wins')
				.setDescription('Default wins is 1! 🥇(Ex: 1/2/3)')
				.setMaxValue(99)
				.setRequired(false))
		.addStringOption(option =>
			option.setName('description')
				.setDescription("Optional: Add on entry description.")
				.setRequired(false)),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
		const choices = [];
		const tabs = await getTabs(interaction.user.id);
		tabs.forEach(tab => {
			choices.push(`${tab.name}`);
		})
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
    },
	async execute(interaction) {
		const user = interaction.user;
        const tabName = interaction.options.getString('name');
		const winner = interaction.options.getUser('winner');
		const stake = interaction.options?.getNumber('stake');
		const wins = interaction.options?.getNumber('wins') || undefined;
		const reason = interaction.options?.getString('description') || undefined;
		const tabs = await getTabs(interaction.user.id);
		const tab = tabs.find(checkTab => checkTab.name === tabName);
		

		const updatedTab = await addEntry(user.id, tab?.id, winner, stake, wins, reason);
		console.log(updatedTab)

		if (!updatedTab) {
			const errorEmbed = genError('Your tab name may be spelled wrong or your stake/wins are invalid.\nFormat -\n💸 Stake: 1.50/10/7.24\n🥇 Wins: 1/2/3')

			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

        const tabEmbed = genTab(updatedTab);

		let msg = await interaction.reply({ embeds: [tabEmbed] });
	},
};