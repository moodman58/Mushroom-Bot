const { REST, Routes } = require('discord.js');
const { clientId, guildId} = require('../config.json');
const deployToken = require('./main.ts');
const deployfs = require('node:fs');
const deploypath = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = './commands';
const commandFolders = deployfs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = deploypath.join(foldersPath, folder);

 
	const commandFiles = deployfs.readdirSync(commandsPath).filter((file : any) => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = deploypath.join(commandsPath, file);
        console.log(filePath)
		const command = require(deploypath.join('../', filePath));
		if ('data' in command && 'execute' in command) {
			console.log(command)
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands},
		);
		
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

