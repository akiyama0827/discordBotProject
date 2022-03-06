const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('버튼')
		.setDescription('버튼을 만듭니다!'),
	async execute(interaction) {

        const buttons = [
            {
                customId: "test1",
                label: "첫번째",
                style: "PRIMARY",
                async action(interaction) {
                    await interaction.reply("test1 버튼을 클릭했다.");
                },
            },
            {
                customId: "test2",
                label: "두번째",
                style: "SECONDARY",
                async action(interaction) {
                    await interaction.update({
                        content: "버튼이 클릭됐어!",
                        components: [/*이 안에 버튼 넣으면 버튼이 바뀜ㅋㅋ*/],
                    });
                },
            },
            {
                customId: "danger",
                label: "위험",
                style: "DANGER",
                async action(interaction) {

                    // 여러분들이 버튼을 클릭했을때, 하고싶은 동작을 코드로 만들면 됨.
                    //자바스크립트 기능을 여기다 추가하면 여러가지를 만들 수 있음.
                    
                    await interaction.reply("위험행!");
                },
            },
        ]


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
        await interaction.reply({ content: '버튼!', components: [row] });

        // 버튼에 응답하는 코드

        const filter = (interaction) => {
            return buttons.filter(
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
            const button = buttons.find(
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