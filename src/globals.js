import { Client, GatewayIntentBits } from 'discord.js'

export const Commands = [];
export const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
