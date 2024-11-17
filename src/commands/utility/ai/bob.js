import { SlashCommandBuilder } from 'discord.js';

const command = {
	info: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	run: async (interaction) => {
		await interaction.reply('Pong!');
	},
};

export default command;
