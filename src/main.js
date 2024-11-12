import fs from 'node:fs'
import path from 'node:path'
import { Init } from '../src/bootstrap.js'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { COMMANDS } from '../src/globals.js'

const commandsPath = './commands';
const commandsFolders = fs.readdirSync(commandsPath);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for ( const folder of commandsFolders) {
	const folderPath = path.join(commandsPath, folder);
	const folderFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.ts'));
	for (const file of folderFiles) {
		const filePath = path.join(folderPath, file);
		const command = require(path.join('../',filePath))
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command)
			console.log(command)
		} 
		else {console.log("Missing either a data or execute section in your file")}
} 
}

client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  // On the bootup
  await Init();
  console.log(COMMANDS)
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}
	const command = interaction.client.commands.get(interaction.commandName);
	console.log(command);
	if (!command) {
		console.error("No matching command name");
		return;
	}
	try {
		await command.run(interaction);
	} 
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	
});

client.login(process.env.DISCORD_TOKEN);
