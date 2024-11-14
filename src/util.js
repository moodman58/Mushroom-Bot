import { Commands, DiscordClient } from '../src/globals.js'
import  fs from 'node:fs'
import path from 'node:path'

export async function readCommands() {
  const foldersPath = './commands';
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandPath, file);
      const command = await import("../" + filePath);
      Commands.push(command.default);
    }
  }
  return Commands;
}

export async function populateCommandMap() {
  for(const command of Commands) DiscordClient.commands.set(command.info.name, command.run); 
}
