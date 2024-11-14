import { SlashCommandBuilder } from 'discord.js';
import { DiscordClient } from '../../src/globals.js';

const command = {
	info: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Mushroom Bot - Command list'),
	run: async (interaction) => {
    let res = "Mushroom Bot - Command list\n";
    const commands = DiscordClient.commands;
    console.log(commands);
    for(const key of commands.keys()) {
      res += key + "\n";
    }
		await interaction.reply(res);
	}
};

export default command;
