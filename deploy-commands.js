const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const { clientId } = process.env.clientId;
const { guildId } = process.env.guildId;
const { token } = process.env.token;

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    // guildIds.map(async(guildId) => {
    //     try {
    //     await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    //         body: commands,
    //     });
    //     console.log(`${guildId} 서버 성공`);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    //이거 글로벌 커맨드 등록하는 놈인데 버그 있으니까 쓰지 말자
    try {
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log(`글로벌 명령어 등록 성공`);
    }
    catch (error) {
        console.error(error);
    }
})();
