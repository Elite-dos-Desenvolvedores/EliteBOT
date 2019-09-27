const moment = require('moment')
const Discord = require('discord.js')
moment.locale('pt-br');





exports.run = async (client, message, args) => {
    message.delete()
    timedown = 604800
    let user = message.mentions.users.first();
    if (!user) return message.reply("mencione um usuário para que você possa recomendar-lo.");
    if (user.id === message.author.id) return message.reply("você não pode recomendar si mesmo.");
    if (user === user.bot) return message.reply("você não pode recomendar um **bot**.")

    client.Database.Reppers.findOne({
        "_id": message.author.id
    }, function (erro, documento) {
        if (documento) {
            if (Date.now() > documento.time) {

                client.Database.Reppers.findOneAndDelete({
                    "_id": message.author.id
                }, function (erro, docs) {
                    if (docs) {
                        new client.Database.Reppers({
                            _id: message.author.id,
                            time: Number(Date.now()) + Number(timedown) * 1000
                        }).save()

                        client.Database.Reps.findOne({
                            "_id": user.id
                        }, function (erro, documento) {
                            if (documento) {
                                documento.reps += 1
                                documento.save()
                                message.channel.send(`${message.author}, deu **1** ponto de reputação para <@${user.id}>.`)
                            }
                            if (!documento) {
                                new client.Database.Reps({
                                    _id: user.id,
                                    reps: 1
                                }).save()
                                message.channel.send(`${message.author}, deu **1** ponto de reputação para <@${user.id}>.`)
                            }

                        })
                    }

                })
            } else {
                const time = Number(documento.time) - Number(Date.now())
                const embed = new Discord.RichEmbed()
                    .setAuthor("EdD - Recomendações", client.user.avatarURL)
                    .setDescription(`Você só pode recomendar alguém novamente após \`${moment(Number(documento.time)).format('LLL')}\`.`)
                    .setFooter(message.author.tag, message.author.avatarURL)
                    .setTimestamp()
                    .setColor("RANDOM")
                message.channel.send(embed)
                console.log(moment(Number(documento.time)).format('LLL'));

                if(!time.days === 0) return message.channel.send(`${message.author}, aguarde **${time.days} dias** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
                if(time.days === 0) return message.channel.send(`${message.author}, aguarde **${time.hours} horas** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
                if(time.hours === 0) return message.channel.send(`${message.author}, aguarde **${time.minutes} minutos** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
                if(time.minutes === 0) return message.channel.send(`${message.author}, aguarde de **${time.seconds} segundos** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))



                if(time.days > 1) return message.channel.send(`${message.author}, aguarde **${time.days} dias** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
                if(time.days < 1) return message.channel.send(`${message.author}, aguarde **${time.hours} horas** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
                if(time.hours < 1) return message.channel.send(`${message.author}, aguarde **${time.minutes} minutos** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
                if(time.minutes < 1) return message.channel.send(`${message.author}, aguarde de **${time.seconds} segundos** para recomendar alguém novamente.`).then(msg=> msg.delete(8000))
            }



        } else {
            new client.Database.Reppers({
                _id: message.author.id,
                time: Number(Date.now()) + Number(timedown) * 1000
            }).save()

            client.Database.Reps.findOne({
                "_id": user.id
            }, function (erro, documento) {
                if (documento) {
                    documento.reps += 1
                    documento.save()
                    message.channel.send(`${message.author}, deu **1** ponto de reputação para <@${user.id}>.`)
                }
                if (!documento) {
                    new client.Database.Reps({
                        _id: user.id,
                        reps: 1
                    }).save()
                    message.channel.send(`${message.author}, deu **1** ponto de reputação para <@${user.id}>.`)
                }

            })



        }
    })
}

exports.help = {
    name: "recomendar",
    aliases: [
        'rep'
    ]
}