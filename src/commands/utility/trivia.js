import { SlashCommandBuilder } from 'discord.js';

const command = {
	info: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Asks General Trivia Question'),
	run: async (interaction) => {
        const information = await fetch('https://the-trivia-api.com/v2/questions');
        const json = await information.json();
        const query = json[0].question.text;
        const answer = json[0].correctAnswer;
        console.log(query, ":", answer);
		await interaction.reply(query);
	},
};

export default command;
