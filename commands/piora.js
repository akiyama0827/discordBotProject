const { SlashCommandBuilder } = require('@discordjs/builders');
// at the top of your file
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const pioraER = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('"내 적은 어디에 있지?"')
    .setImage('https://imgur.com/QPJScdX.png');

const pioraLOL = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('"겨뤄볼 만한 상대… 어디 없나?"')
    .setImage('https://imgur.com/Ku77axZ.png');

const paori = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('피오라...?')
    .setImage('https://imgur.com/ss8KRIF.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('피오라뽑기')
		.setDescription('피오라를 뽑습니다! ...근데 어떤 피오라?'),
	async execute(interaction) {
        const randomNum = Math.floor((Math.random()*100)+1);
        if (randomNum <= 5) {
            await interaction.reply({ embeds: [pioraLOL] });
        } else if ((randomNum >= 6) && (randomNum <= 10)) {
            await interaction.reply({ embeds: [paori] });
        } else {
        await interaction.reply({ embeds: [pioraER] });
        }
	},
};