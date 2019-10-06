var database = require('../../database.js')

exports.run = (client, message, args) => {
    
    database.Users.findOne({
        '_id': message.author.id
    }, function (erro, developer) {
        if (developer) {
            if (developer.owner) {
                if (message.mentions.users.size < 1) {
                    message.channel.send('Por favor, mencione o usuário.')
                } else {
                    database.Users.findOne({
                        '_id': message.mentions.users.first().id
                    }, function (erro, usuario) {
                        if (usuario) {
                            if (usuario.doador) {
                                usuario.doador = false
                                usuario.save()
                                message.reply(`O usuário **<@${message.mentions.users.first().id}>** não é mais um **doador!**`)
                                message.mentions.members.first().removeRole('630518001086627871').catch(console.error);
                            } else {
                                usuario.doador = true
                                usuario.timedoador = Date.now()
                                usuario.save()
                                message.reply(`O usuário **<@${message.mentions.users.first().id}>** agora é um **doador!**`)
                                message.mentions.members.first().addRole('630518001086627871').catch(console.error);
                            }
                        } else {
                            message.channel.send('Ocorreu um erro ao executar este comando.')
                        }
                    })
                }
            } else {
                message.reply('Sem permissão.')
            }
        } else {
            message.channel.sendMessage('Ocorreu um erro ao executar este comando.')
        }
    })
}

exports.help = {
    name: 'setdoador'
}