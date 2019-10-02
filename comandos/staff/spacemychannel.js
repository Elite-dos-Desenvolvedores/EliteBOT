exports.run = async(client, message, args) => {
    const channelName = message.mentions.channels.first();

    if(!channelName.includes("-")) return message.reply('não é possivel colocar espaços nesse canal.').then(msg => msg.delete(5000));
    const newName = channelName.replace(/-/g, '\u2005');

    message.channel.send(`${message.author}, você colocou espaços no canal. `).then(msg => msg.delete(5000));
    message.channel.setName(newName)

}

exports.help = {
    name: 'spacemychannel'
}