const { GuildMember } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    description: 'Play a song in your channel!',
    options: [
        {
            name: 'query',
            type: 3,
            description: 'The song you want to play',
            required: true,
        },
    ],
    async execute(interaction, player){
        try {
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
                   content: 'You are not in a voice channel!',
                   ephemeral: true,
               });
            }

            await interaction.deferReply();

            const query = interaction.options.get('query').value;
            const searchResult = await player
                .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })
                .catch(() => {});

        } catch (error) {
            console.log(error);
            interaction.followUp({
              content: 'There was an error trying to execute that command: ' + error.message,
            });
          }
    },   
};