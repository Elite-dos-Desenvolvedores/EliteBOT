const c = require('../config.json')

exports.run = async (client, message, [state]) => {
    const SEND_MESSAGES = state === 'on';
    message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg=> msg.delete(8000))
    await message.channel.overwritePermissions(
        client.guilds
        .get(c.guildID)
        .roles.find('name', '@everyone'), {
            SEND_MESSAGES
        }
    );
    if (SEND_MESSAGES) {
        await message.channel.send('Este canal foi aberto.').then(msg => msg.delete(2000));
        await message.channel
            .send('Canal aberto com sucesso.')
            .then(msg => msg.delete(8000));
    } else {
        await message.channel.send('Este canal foi pausado.').then(msg => msg.delete(2000));
        await message.channel
            .send('Canal pausado com sucesso.')
            .then(msg => msg.delete(8000));
    }
}

exports.help = {
    name: "chat"
}