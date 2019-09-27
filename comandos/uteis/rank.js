const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    message.delete()

    client.Database.Users.find({}).sort("-xp").then(docs => {
        if (!docs[0] || !docs[1] || !docs[2] || !docs[3] || !docs[4]) return message.channel.send(`${message.author}, não temos nenhum usuário no rank atualmente.`)
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Rank", client.user.avatarURL)
            .setDescription(` \n**1º** <@${docs[0]._id}> - lvl. ${docs[0].level} • ${docs[0].xp}xp
**2º** <@${docs[1]._id}> - lvl. ${docs[1].level} • ${docs[1].xp}xp
**3º** <@${docs[2]._id}> - lvl. ${docs[2].level} • ${docs[2].xp}xp
**4º** <@${docs[3]._id}> - lvl. ${docs[3].level} • ${docs[3].xp}xp
**5º** <@${docs[4]._id}> - lvl. ${docs[4].level} • ${docs[4].xp}xp`)
            .setFooter(message.author.tag, message.author.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setTimestamp()
        message.channel.send(embed)
    })
}

exports.help = {
    name: "rank"
}