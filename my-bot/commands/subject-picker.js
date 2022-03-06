const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const allSubjects = require('../subjects.json');
const subjectsKeys = Object.keys(allSubjects);
const subjectsCount = subjectsKeys.length;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('실험체뽑기')
		.setDescription('실험체 하나를 무작위로 골라줍니다!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('전체')
                .setDescription('전체 실험체 중 하나를 무작위로 골라줍니다!'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('근딜')
                .setDescription('근거리 실험체 중 하나를 무작위로 골라줍니다!'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('원딜')
                .setDescription('원거리 실험체 중 하나를 무작위로 골라줍니다!')),
	async execute(interaction) {
        const option = interaction.options.getSubcommand();
        if (option === '전체') {
            const randomNum = Math.floor(Math.random()*subjectsCount);
		    newEmbed = new MessageEmbed()
			    .setColor('#0099ff')
			    .setTitle(`${allSubjects[subjectsKeys[randomNum]][0]}`)
			    .setDescription(`${allSubjects[subjectsKeys[randomNum]][1]}`)
			    .setImage(`${allSubjects[subjectsKeys[randomNum]][2]}`);
		    await interaction.reply({ embeds: [newEmbed] });
        }else if (option === '근딜') {
            let randomNum = Math.floor(Math.random()*subjectsCount);
            while (allSubjects[subjectsKeys[randomNum]][3]) {
                randomNum = Math.floor(Math.random()*subjectsCount);
            }
            newEmbed = new MessageEmbed()
			    .setColor('#0099ff')
			    .setTitle(`${allSubjects[subjectsKeys[randomNum]][0]}`)
			    .setDescription(`${allSubjects[subjectsKeys[randomNum]][1]}`)
			    .setImage(`${allSubjects[subjectsKeys[randomNum]][2]}`);
		    await interaction.reply({ embeds: [newEmbed] });
        } else if (option === '원딜') {
            let randomNum = Math.floor(Math.random()*subjectsCount);
            while (!(allSubjects[subjectsKeys[randomNum]][3])) {
                randomNum = Math.floor(Math.random()*subjectsCount);
            }
            newEmbed = new MessageEmbed()
			    .setColor('#0099ff')
			    .setTitle(`${allSubjects[subjectsKeys[randomNum]][0]}`)
			    .setDescription(`${allSubjects[subjectsKeys[randomNum]][1]}`)
			    .setImage(`${allSubjects[subjectsKeys[randomNum]][2]}`);
		    await interaction.reply({ embeds: [newEmbed] });
        }
	}
};