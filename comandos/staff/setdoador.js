var database = require('../../database.js')

exports.run = (message) => {

    const doadorRole = message.guild.roles.get('630518001086627871'); // Parceiros
    
    database.Users.findOne({
        '_id': message.author.id
    }, function (erro, developer) {
        if (developer) {
            if (developer.owner) {
                if (message.mentions.users.size < 1) {
                    message.channel.sendMessage('Por favor, mencione o usuário.')
                } else {
                    database.Users.findOne({
                        '_id': message.mentions.users.first().id
                    }, function (erro, usuario) {
                        if (usuario) {
                            if (usuario.doador) {
                                usuario.doador = false
                                usuario.save()
                                message.reply(`O usuário **<@${message.mentions.users.first().id}>** não é mais um **doador!**`)
                                member.removeRole(doadorRole).catch(console.error);
                            } else {
                                usuario.doador = true
                                usuario.timedoador = Date.now()
                                usuario.save()
                                message.reply(`O usuário **<@${message.mentions.users.first().id}>** agora é um **doador!**`)
                                member.addRole(doadorRole).catch(console.error);
                            }
                        } else {
                            message.channel.sendMessage('Ocorreu um erro ao executar este comando.')
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