const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const create = require('../../helper/tabs/create');
const me = require('../../helper/tabs/me');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tab')
		.setDescription("📜 Create, Remove, or Edit a Tab. 🖊️")
		.addSubcommand((subcommand) =>
		subcommand
		.setName("me")
		.setDescription("See and edit all of your active tabs."))
		.addSubcommand((subcommand) =>
		subcommand
		.setName("create")
		.setDescription("Create a tab with someone.")
		.addStringOption(option =>
			option.setName('name')
				.setDescription("What is your new tab's name")
				.setRequired(true)
				.setMaxLength(15)
				.setMinLength(3))
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Do you want a money or wins tracking tab?')
				.setRequired(true)
				.addChoices(
					{ name: 'Money', value: 'money'},
					{ name: 'Wins', value: 'wins'},
					{ name: 'Both', value: 'both'}
					))
		.addUserOption(option =>
			option.setName('user')
				.setDescription("Who do you want to create a tab with?")
				.setRequired(true)
				))
		.addSubcommand((subcommand) =>
		subcommand
		.setName("clear")
		.setDescription("Clear out a tab's entries.")
		.addStringOption(option =>
			option.setName('name')
				.setDescription("What is your tab's name")
				.setRequired(true)
				.addChoices(
					{ name: 'tabName', value: 'test' },
				)),
				)
		.addSubcommand((subcommand) =>
		subcommand
		.setName("remove")
		.setDescription("Send a tab to the shadow realm.")
		.addStringOption(option =>
			option.setName('name')
				.setDescription("What is your tab's name")
				.setRequired(true)
				.addChoices(
					{ name: 'tabName', value: 'test' },
				)),
				)
		.addSubcommand((subcommand) =>
		subcommand
		.setName("rename")
		.setDescription("Rename a tab, allowed once every 24 hours.")
		.addStringOption(option =>
			option.setName('name')
				.setDescription("What is your tab's name")
				.setRequired(true)
				.addChoices(
					{ name: 'tabName', value: 'test' },
				))
				.addStringOption(option =>
					option.setName('rename')
						.setDescription("What are you renaming your tab?")
						.setRequired(true)
						.setMaxLength(15)
						.setMinLength(3))),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case 'create':
				await create(interaction);
				break;

			case 'me':
				await me(interaction);
				break;
		}
	},
};