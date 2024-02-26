const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription("📜 Add an entry to a Tab. 🖊️")
        .addStringOption(option =>
			option.setName('name')
				.setDescription("What tab do you want to add to?")
				.setRequired(true)
				.setAutocomplete(true))
        .addStringOption(option =>
            option.setName('amount')
                .setDescription("What do you want to add to the Tab? 💸 / 🥇")
                .setRequired(true)),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
		const choices = ['1', '2'];
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
    },
	async execute(interaction) {
        const tabName = interaction.options.getString('name');
        const testEmbed = new EmbedBuilder()
            .setTitle(`${tabName}`)
            .setColor([0, 205, 227])

		let msg = await interaction.reply({ embeds: [testEmbed] });
	},
};