import { SlashCommandBuilder } from 'discord.js'
import { DiscordClient, CommandPaths } from '../../globals.js'
import process from 'node:process'


const command = {
	info: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Mushroom Bot - Command list and Structure'),
	run: async (interaction) => {
    var res = "Mushroom Bot - Command list\n";
    const tracker = [];
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

      let pointer1 = 0;
      let depth = 0;
      while (pointer1 < arr.length) {
        if (arr[pointer1].includes(".js")) {
          if (depth != 0) {
            res = res + " ".repeat(depth) + arr[pointer1] + "\n";
          }
          else {
            res = res + arr[pointer1] + "\n";
          }
          pointer1++;
      } else {

        if ( !(tracker.includes(arr[pointer1]))) { 
          if (depth != 0){
          res = res + (" ".repeat(depth) + arr[pointer1]) + "\n";
        } 
          else {
          res =  res + arr[pointer1] + "\n";
        }
        tracker.push(arr[pointer1])
      }
      depth++;
      pointer1++;
      }
      }

      
    }
    console.log(res);
		await interaction.reply(res);
	}
};

export default command;
