import play from './command/play.js';
import skip from './command/skip.js';
import stop from './command/stop.js';
import Discord from 'discord.js';
import config from './config.json';

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
    console.log('Ready !');
});

client.once('reconnecting', () => {
    console.log('Reconnecting !');
});

client.once('disconnect', () => {
    console.log("Disconnect !");
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.username === "Lewok" && message.content.startsWith(config.prefix))
        message.channel.send("Hey toi tu arrete d'etre aussi beau la");

    const serverQueue = queue.get(message.guild.id);
    if(message.content.startsWith(`${config.prefix} play`)){
        play(message,serverQueue,queue);
        return;
    } else if(message.content.startsWith(`${config.prefix} skip`)){
        skip(message,serverQueue);
        return;
    } else if(message.content.startsWith(`${config.prefix} stop`)) {
        stop(message, serverQueue);
        return;
    } else {
        message.channel.send("You need to enter a valid command!");
    }
});

client.login(config.token);