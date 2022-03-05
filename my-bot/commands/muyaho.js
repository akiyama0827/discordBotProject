const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('무한')
		.setDescription('무야호라고 대답합니다!'),
	async execute(interaction) {
		await interaction.reply('무야호~!');
	},
};