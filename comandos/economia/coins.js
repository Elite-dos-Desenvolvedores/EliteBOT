const Discord = require('discord.js');

const Database = require('../../database.js');

exports.run = (client, message, args) => {
    let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
    client.Database.Users.findOne({
        '_id': user.id
    }, (err, user) => {

        if (err) throw err;

        if (user) {
            let msg = message.mentions.users.first() ? (`<@${user.id}> tem ${user.coins} coins`) : (`Você tem ${user.coins} coins`)
            message.channel.send(msg)

        } else {
            message.channel.send('Não encontrei seu perfil em minha database')
        }
    });
}

exports.help = {
    name: 'coins',
    aliases: ['money', 'saldo']
}