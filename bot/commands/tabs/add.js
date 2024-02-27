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
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription("What do you want to add to the Tab? 💸(Ex: 1.50/10/7.24) / 🥇(Ex: 1/2/3)")
                .setRequired(true))
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
		const amount = interaction.options.getNumber('amount');
		const reason = interaction.options?.getString('description') || undefined;
		const tabs = await getTabs(interaction.user.id);
		const tab = tabs.find(checkTab => checkTab.name === tabName);
		

		const updatedTab = await addEntry(user.id, tab?.id, amount, reason);
		console.log(updatedTab)

		if (!updatedTab) {
			const errorEmbed = genError('Your tab name may be spelled wrong or your amount is invalid.\nAmount Formats -\n💸 Money: 1.50/10/7.24\n🥇 Wins: 1/2/3\nBoth: (Same as Money)')

			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

        const tabEmbed = genTab(updatedTab);

		let msg = await interaction.reply({ embeds: [tabEmbed] });
	},
};