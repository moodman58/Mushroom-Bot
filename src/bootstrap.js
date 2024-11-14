import { readCommands, populateCommandMap } from '../src/util.js'
import { DiscordClient } from '../src/globals.js'
import { Collection } from 'discord.js'

export async function Init() {
  DiscordClient.commands = new Collection();
  await readCommands();
  await populateCommandMap();
}
