const Discord = require('discord.js')
const c = require('../config.json')


exports.run = async (client, message, args) => {
    message.delete()
    client.Database.Reps.find({}).sort("-reps").then(docs => {
        if (!docs[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("EdD - Reputações", client.user.avatarURL)
                .setDescription(`Não existem usuários no ranking de recomendados!`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
            return message.channel.send(embed)
        }

        if (!docs[1]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("EdD - Reputações", client.user.avatarURL)
                .setDescription(` \n**1º** <@${docs[0]._id}> - rep. ${docs[0].reps}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
            return message.channel.send(embed)

        }
        if (!docs[2]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("EdD - Reputações", client.user.avatarURL)
                .setDescription(` \n**1º** <@${docs[0]._id}> - rep. ${docs[0].reps}
**2º** <@${docs[1]._id}> - rep. ${docs[1].reps}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
            return message.channel.send(embed)
        }
        if (!docs[3]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("EdD - Reputações", client.user.avatarURL)
                .setDescription(` \n**1º** <@${docs[0]._id}> - rep. ${docs[0].reps}
**2º** <@${docs[1]._id}> - rep. ${docs[1].reps} 
**3º** <@${docs[2]._id}> - rep. ${docs[2].reps}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
            return message.channel.send(embed)
        }
        if (!docs[4]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("EdD - Reputações", client.user.avatarURL)
                .setDescription(` \n**1º** <@${docs[0]._id}> - rep. ${docs[0].reps}
**2º** <@${docs[1]._id}> - rep. ${docs[1].reps} 
**3º** <@${docs[2]._id}> - rep. ${docs[2].reps}
**4º** <@${docs[3]._id}> - rep. ${docs[3].reps}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
            return message.channel.send(embed)
        }
        if (docs[4]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("EdD - Reputações", client.user.avatarURL)
                .setDescription(` \n**1º** <@${docs[0]._id}> - rep. ${docs[0].reps}
**2º** <@${docs[1]._id}> - rep. ${docs[1].reps}
**3º** <@${docs[2]._id}> - rep. ${docs[2].reps}
**4º** <@${docs[3]._id}> - rep. ${docs[3].reps}
**5º** <@${docs[4]._id}> - rep. ${docs[4].reps}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
            return message.channel.send(embed)
        }
    })
}

exports.help = {
    name: "reputação",
    aliases: [
        'toprep'
    ]
}