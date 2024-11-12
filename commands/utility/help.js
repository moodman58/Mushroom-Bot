import { SlashCommandBuilder } from 'discord.js';


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Mushroom Bot - Command list'),
	run: async function execute(interaction) {
    const res = "Mushroom Bot - Command list";

		await interaction.reply('Pong!');
	}
};

export default;
