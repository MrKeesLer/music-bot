export default function skip(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
        "Et tu vien vocal sinon je travaille pas la"
        );
    if (!serverQueue)
        return message.channel.send("Alors en faite j'ai pas la suite");
    serverQueue.connection.dispatcher.end();
}