import { SlashCommandBuilder } from 'discord.js'
import { DiscordClient, CommandPaths } from '../../globals.js'
import process from 'node:process'

const helpMap = new Map();
const command = {
	info: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Mushroom Bot - Command list'),
	run: async (interaction) => {
    let res = "Mushroom Bot - Command list\n";
    for(const entry of CommandPaths) {
      let arr = entry.split(/(\\|\/)/).filter((entry) => entry != "\\");
      let baseIndex = -1;
      // clean arr

      for(let i = 0; i < arr.length; ++i) {
        if(arr[i] === "commands") {
          baseIndex = i;
          break;
        }
      }

      arr = arr.splice(baseIndex + 1);

      console.log(arr);

      if(!helpMap.has(arr[0])) helpMap.set(arr[0], []);
      for(let i = 1; i < arr.length; ++i) {
        if(helpMap.has(arr[0])) helpMap.get(arr[0]).push(arr[i]);
      }
    }
    console.log(helpMap);
		await interaction.reply(res);
	}
};

export default command;
