import ytdl from 'ytdl-core';

    export default async function execute(message, serverQueue, queue) {
        const args = message.content.split(" ");
    
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
            return message.channel.send("Et tu vien vocal sinon je travaille pas la");
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT") || !permissions.has("SPEAK")){
            return message.channel.send("Et j'ai pas le droit de venir ici c'est bizzare");
        }
    
        try {
            const songInfo = await ytdl.getInfo(args[2]);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
        
            if(!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                };
        
                queue.set(message.guild.id,queueConstruct);
                queueConstruct.songs.push(song);
        
                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                }
        
            }else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                return message.channel.send(`${song.title} a était ajouter à la QUEUE!`);
            }
        } catch (err) {
            console.log(err);
            return message.channel.send(err);
        }
         
        
    }
    
    function play(guild, song, queue) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
    
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Je lance: **${song.title}**`);
    }
