export default function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
        "Et tu vien vocal sinon je travaille pas la"
        );
    if (!serverQueue)
        return message.channel.send("Et je travaille pas la donc je peux pas arrete gros con");

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}