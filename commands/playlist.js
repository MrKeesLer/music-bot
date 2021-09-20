const { GuildMember } = require('discord.js');

module.exports = {
    name: 'playlist',
    description: 'Get info of the song in the queue!',
    async execute(interaction,player){
        if(!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        if(
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
        ) {
            return void interaction.reply({
                content: 'You are not in my voice channel!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if(!queue || !queue.playing)
            return void interaction.followUp({
                content: '❌ | No music is being played!',
            });
        return void interaction.followUp({
            embeds: [{
                title: 'Playlist',
                fields: [{
                    name: '🎶 | List of all song in the queue',
                    value: queue.toString(),
                }],
            }],
        });
    },
};