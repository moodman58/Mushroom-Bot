import { SlashCommandBuilder } from 'discord.js'
import { DiscordClient, CommandPaths } from '../../globals.js'


const command = {
	info: new SlashCommandBuilder()
		.setName('help')
		.setDescription('The help command will give you a list of commands and a high level description...'),
	run: async (interaction) => {
    let helpMessage = "```\n";
    const categories = new Set();
    for(const path of CommandPaths) {
      let commandIndex = -1;
      const filtered = path.split("\\").filter((entry, i) => {
        if(entry === "commands") commandIndex = i;
        return commandIndex != -1 && i > commandIndex;
      });
      let reset = -1;
      for(let i = 0; i < filtered.length; ++i) {
        if(i === 0 && !categories.has(filtered[i])) {
          helpMessage += `${filtered[i]}\n`;
        } else {
            const check = filtered[i];
            if(!categories.has(filtered[i])) {
              if(filtered[i].endsWith(".js")) {
                helpMessage += "\t".repeat(i) + `${check}`;
                const obj = interaction.client.commands.get(filtered[i].slice(0, filtered[i].length - 3));
                if(obj) helpMessage += ` - ${obj.info.description}\n`;
              } else {
                helpMessage += "\t".repeat(i) + `${check}\n`;
              }
            }
          }
          categories.add(filtered[i])
        }
      }

    helpMessage += "```";
    interaction.reply(helpMessage);
	}
};

export default command;
