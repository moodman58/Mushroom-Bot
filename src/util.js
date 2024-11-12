import { COMMANDS } from '../src/globals.js'
import  fs from 'node:fs'
import  path from 'node:path'

export async function readCommands() {
  // Grab all the command folders from the COMMANDS directory you created earlier
  const foldersPath = './commands';
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    // Grab all the command files from the COMMANDS directory you created earlier
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      console.log(file, commandPath);
      const filePath = path.join(commandPath, file);
      const cwd = process.cwd();
      console.log(cwd)
      const command = await import(filePath);
      console.log(command)
      if ('data' in command && 'execute' in command) {
        console.log(command)
        COMMANDS.push(command.data.toJSON());
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
  console.log(COMMANDS);
  return COMMANDS;
}
