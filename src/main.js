import { Events } from 'discord.js'
import { Init } from '../src/bootstrap.js'
import { DiscordClient } from '../src/globals.js'

DiscordClient.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  // On the bootup
  await Init();
});

DiscordClient.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}
	const command = interaction.client.commands.get(interaction.commandName);
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

DiscordClient.login(process.env.DISCORD_TOKEN);
