const { SlashCommandBuilder } = require('@discordjs/builders');
// at the top of your file
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const helpEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('명령어 목록')
	.addFields(
        ////실험체뽑기 : 실험체 하나를 무작위로 골라줍니다.
		{ name: '/유저', value: '유저 정보를 확인합니다.' },
        { name: '/서버', value: '서버 정보를 확인합니다.' },
        { name: '/실험체뽑기', value: '실험체 하나를 무작위로 골라줍니다. 전체/근딜/원딜으로 범위를 설정할 수 있습니다.' },
        { name: '/가위바위보', value: '봇과 가위바위보를 합니다.' },
		//{ name: '\u200B', value: '\u200B' },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('도움말')
		.setDescription('도움말을 확인합니다!'),
	async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed] });
	},
};