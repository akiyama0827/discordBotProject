const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const button = require('./button');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('가위바위보')
		.setDescription('봇과 가위바위보를 합니다!'),
	async execute(interaction) {

        let isDone = false;

        const buttons = [
            {
                customId: "가위",
                label: "가위 ✌",
                style: "DANGER",
                async action(interaction) {
                    const result = Math.floor(Math.random()*3);
                    if (result === 0) {
                        await interaction.update({content: "당신의 패배입니다!", components: []});
                    } else if (result === 1) {
                        await interaction.update({content: "당신의 승리입니다!", components: []});
                    } else {
                        await interaction.update({content: "무승부입니다! 좋은 승부였네요!", components: []});
                    }
                    isDone = true;
                }
            },
            {
                customId: "바위",
                label: "바위 ✊",
                style: "SUCCESS",
                async action(interaction) {
                    const result = Math.floor(Math.random()*3);
                    if (result === 0) {
                        await interaction.update({content: "당신의 패배입니다!", components: []});
                    } else if (result === 1) {
                        await interaction.update({content: "당신의 승리입니다!", components: []});
                    } else {
                        await interaction.update({content: "무승부입니다! 좋은 승부였네요!", components: []});
                    }
                    isDone = true;
                }
            },
            {
                customId: "보",
                label: "보 🖐",
                style: "PRIMARY",
                async action(interaction) {
                    const result = Math.floor(Math.random()*3);
                    if (result === 0) {
                        await interaction.update({content: "당신의 패배입니다!", components: []});
                    } else if (result === 1) {
                        await interaction.update({content: "당신의 승리입니다!", components: []});
                    } else {
                        await interaction.update({content: "무승부입니다! 좋은 승부였네요!", components: []});
                    }
                    isDone = true;
                }
            },
        ]
        
        async function timeover(interaction) {
            if(!isDone) {
            await interaction.editReply({content: "10초가 지나 무승부로 처리하겠습니다!", components: []});
            }
        };

        const row = new MessageActionRow().addComponents(
            // 여기 안에 버튼을 추가합니다.
            buttons.map((button) => {
                return new MessageButton()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setStyle(button.style);
            })
        );

        // 버튼을 만드는 코드
        await interaction.reply({ content: '가위바위보!', components: [row] });

        // 버튼에 응답하는 코드
        const filter = (interaction) => {
            return buttons.filter(
                button => button.customId === interaction.customId
            )
        };

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 10 * 1000, // 버튼 유효시간, ms단위 -> 3초면 3000으로 입력
        });

        collector.on("collect", async (interaction) => {
            // 배열에 있는 동작을 자동으로 읽음
            const button = buttons.find(
                button => button.customId === interaction.customId
            );
            await button.action(interaction);
        });

        //버튼의 시간초과가 됐을때, 뭘 할지 정의
        collector.on("end", async (collect) => {
            timeover(interaction);
        });
	},
};