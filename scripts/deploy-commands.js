import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const commands = [];
const foldersPath = './src/commands';
const commandFolders = fs.readdirSync(foldersPath);

(async () => {
  await (async () => {
    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import('../' + filePath);
        commands.push(command.default.info);
      }
    }
  })();

  await (async () => {
    try {
      const rest = new REST().setToken(process.env.DISCORD_TOKEN);
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID_MUSHROOM_BOT_SERVER),
        { body: commands},
      );
      
      console.log(`Successfully reloaded ${(data).length} application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
})();

