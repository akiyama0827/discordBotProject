const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('테스트')
		.setDescription('개발 중 테스트용'),
	async execute(interaction) {

        const gameBtns = [
            {
                customId: "참가",
                label: "참가",
                style: "SUCCESS",
                async action(interaction) {
					await interaction.editReply({
						embeds: []
					});
                },
            },
            {
                customId: "나가기",
                label: "나가기",
                style: "DANGER",
                async action(interaction) {
                    await interaction.editReply({
                        embeds: []
                    });
                },
            },
            {
                customId: "바로 시작",
                label: "바로 시작",
                style: "PRIMARY",
                async action(interaction) {
                    await interaction.editReply({
						embeds: []
					});
                },
            }
        ]

		const startBtns = [
			{
                customId: "시작",
                label: "시작",
                style: "SUCCESS",
                async action(interaction) {
					await interaction.update({
						content: '31게임을 진행합니다. 참가 버튼을 눌러 참가해주세요. 게임은 30초 후 자동으로 시작합니다.',
						components: [row2]
					})
                },
            },
			{
                customId: "취소",
                label: "취소",
                style: "DANGER",
                async action(interaction) {
					await interaction.update({
						content: '31게임이 취소되었습니다.',
						components: []
					});
                },
            }
		]

		const allBtns = startBtns.concat(gameBtns);

        const row2 = new MessageActionRow().addComponents(
            gameBtns.map((button) => {
                return new MessageButton()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setStyle(button.style);
            })
        );

		const row1 = new MessageActionRow().addComponents(
            startBtns.map((button) => {
                return new MessageButton()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setStyle(button.style);
            })
        );

        // 버튼을 만드는 코드
        await interaction.reply({ content: '31게임을 시작할까요?', components: [row1] });

        // 버튼에 응답하는 코드

        const filter = (interaction) => {
            return allBtns.filter(
                button => button.customId === interaction.customId
            )
        };

        //만들었다고 적용되는건 아니에요
        const collector = interaction.channel.createMessageComponentCollector({
            // 몇초동안 반응 할 수 있는지
            filter,
            time: 30 * 1000, // ms단위 -> 3초면 3000으로 입력
        });

        collector.on("collect", async (interaction) => {
            // 배열에 있는 동작을 자동으로 읽음
            const button = allBtns.find(
                button => button.customId === interaction.customId
            );
            await button.action(interaction);
        });

        //버튼의 시간초과가 됐을때, 뭘 할지 정의
        collector.on("end", async (collect) => {
            console.log("버튼 시간초과");
        });
	},
};