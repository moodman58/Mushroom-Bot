import { SlashCommandBuilder } from 'discord.js'
import { DiscordClient, CommandPaths } from '../../globals.js'
import { playSong } from '../../music.js'
import { VoiceConnectionStatus, 
         AudioPlayerStatus, 
         joinVoiceChannel, 
         createAudioPlayer, 
         NoSubscriberBehavior, 
         createAudioResource 
} from '@discordjs/voice';

const command = {
	info: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song'),
	run: async (interaction) => {
    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guild.id;
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });
    connection.subscribe(player);
    const resource = createAudioResource('music.mp3');
    player.play(resource);
    interaction.reply("playing");
	}
};

export default command;
