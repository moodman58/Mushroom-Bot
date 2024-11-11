const fs = require('node:fs');
const path = require('node:path');
const config = require('../config.json');

const token = config.token;

const commandsPath = './commands';
const commandsFolders = fs.readdirSync(commandsPath);

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for ( const folder of commandsFolders) {
	const folderPath = path.join(commandsPath, folder);
	const folderFiles = fs.readdirSync(folderPath).filter((file : any) => file.endsWith('.ts'));
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

client.once(Events.ClientReady, (readyClient : any) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction : any) => {
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
		await command.execute(interaction);
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

client.login(token);

module.exports = {token};



