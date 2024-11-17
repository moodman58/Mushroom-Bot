import { Commands, CommandPaths, DiscordClient } from '../src/globals.js'
import  fs from 'fs/promises'
import path from 'node:path'

export async function readCommands(root="./src/commands") {
  try {
    const dir = await fs.readdir(root);
    
    for(const file of dir) { 
      const joined = path.join(root, file);
      const stat = await fs.stat(joined);
      if(stat.isDirectory()) {
        await readCommands(joined);
      } else {
        const filePath = `../${joined}`;
        CommandPaths.push(path.resolve(filePath));
        const command = await import(filePath);
        Commands.push(command.default);
      }
    } 
  } catch(err) {
    console.error(err);
  }
}

export async function populateCommandMap() {
  for(const command of Commands) DiscordClient.commands.set(command.info.name, command); 
}
