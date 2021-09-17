const { GuildMember } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stop the songs and clear the queue!',
    async execute(interaction, player){
        //Check if player is in a voice chat
        if(!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel){
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        //Check if player is in the same voice chat as the bot
        if (
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
        ){
            return void interaction.reply({
                content: 'You are not in my voice channel!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if(!queue || !queue.playing){
            return void interaction.followUp({
                content: '❌ | No music is being played!',
            });
        }
        queue.destroy();
        return void interaction.followUp({content: '🛑 | Stopped the player!'});
    },
};