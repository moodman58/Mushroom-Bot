import { Client, GatewayIntentBits, Collection } from 'discord.js'

export const Commands = [];
export const CommandPaths = [];
export const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
