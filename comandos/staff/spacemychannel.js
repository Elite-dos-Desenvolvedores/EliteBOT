exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))
    const channelName = message.mentions.channels.first().name

    if(!channelName.includes("-")) return message.reply('não é possivel colocar espaços nesse canal.').then(msg => msg.delete(5000));
    const newName = channelName.replace(/-/g, '\u2005');

    message.channel.send(`${message.author}, você colocou espaços no canal. `).then(msg => msg.delete(5000));
    await message.mentions.channels.first().setName(newName)

}

exports.help = {
    name: 'spacemychannel'
}