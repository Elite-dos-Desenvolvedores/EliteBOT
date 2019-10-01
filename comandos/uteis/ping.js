exports.run = (client, message, args) => {
    message.channel.send("Pong :ping_pong: **" + parseInt(client.ping) + "ms**");
}

exports.help = {
    name: "ping"
}