const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [
	//new SlashCommandBuilder().setName('야').setDescription('호라고 대답합니다!'),
    //new SlashCommandBuilder().setName('방구').setDescription('방구를 뀝니다!'),
    //new SlashCommandBuilder().setName('서버').setDescription('서버 정보를 봅니다!'),
    //new SlashCommandBuilder().setName('유저').setDescription('유저 정보를 봅니다!'),
]
	.map(command => command.toJSON());

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('커맨드 업데이트 완료'))
	.catch(console.error);