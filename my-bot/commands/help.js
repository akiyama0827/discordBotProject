const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('도움말')
		.setDescription('도움말을 봅니다!'),
	async execute(interaction) {
		await interaction.reply('/유저 : 유저정보를 확인합니다.\n/서버 : 서버정보를 확인합니다.');
	},
};