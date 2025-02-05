import { SlashCommandBuilder } from 'discord.js';
import { TRIVIA_API_ENDPOINT } from '../../../constants.js';

const ANSWER_TIMER = 20000;
const command = {
	info: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Asks General Trivia Question'),
	run: async (interaction) => {
    try {
      const information = await fetch(TRIVIA_API_ENDPOINT);
      const json = await information.json();
      const query = json[0].question.text;
      const answer = json[0].correctAnswer;
      await interaction.reply(query);
      setTimeout(async () => await interaction.followUp(answer), ANSWER_TIMER);
    } catch(err) {
      console.error(err);
    }
	},
};

export default command;
