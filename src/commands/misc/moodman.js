import { SlashCommandBuilder } from 'discord.js'
import { DiscordClient, CommandPaths } from '../../globals.js'


const command = {
	info: new SlashCommandBuilder()
		.setName('moodman')
		.setDescription('Mushroom Bot - Command list and Structure'),
	run: async (interaction) => {
    let helpMessage = "";
    const categories = new Set();
    for(const path of CommandPaths) {
      let commandIndex = -1;
      const filtered = path.split("\\").filter((entry, i) => {
        if(entry === "commands") commandIndex = i;
        return commandIndex != -1 && i > commandIndex;
      });
      console.log(filtered)
      // We know that anything that does not end with a .js is a folder / category
      let reset = -1;
      for(let i = 0; i < filtered.length; ++i) {
        if(i === 0 && !categories.has(filtered[i])) {
          helpMessage += `${filtered[i]}\n`;
        } else {
            const check = filtered[i];
            if(!categories.has(filtered[i])) helpMessage += "\t".repeat(i) + `${check}\n`;
          }
          categories.add(filtered[i])
        }
      }
    interaction.reply(helpMessage);
	}
};

export default command;
