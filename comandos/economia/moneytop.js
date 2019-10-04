const Discord = require("discord.js")
const database = require('../../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = (message, args) => {
var usuarios = []
var num = 0

database.Users.find({}, function (erro, documento) {
    database.Users.findOne({
        '_id': user.id
      }, function (erro, usu) {
        if (usu) {
            documento.filter(a => users.get(a._id)).map(a => usuarios.push({
              user: a._id,
              saldo: a.coins
            }))
    
            usuarios.sort(function (a, b) {
              return b.saldo - a.saldo
            })

            var moneytop = usuarios.map(a => '**' + `n${(num += 1)}`.replace('n1', ':one:').replace('n2', ':two:').replace('n3', ':three:').replace('n4', ':four:').replace('n5', ':five:').replace('n6', ':six:').replace('n7', ':seven:').replace('n8', ':eight:').replace('n9', ':nine:').replace('n10', ':keycap_ten:') + '** » `' + users.get(a.user).tag + '` **$' + Number(a.saldo).toLocaleString() + '**.').slice(0, 10).join('\n')

        const embed = new Discord.RichEmbed()
            .setTitle(`💰 **|** Os top 10 mais ricos`)
            .setDescription(`${moneytop}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`💰 Você neste momento tem: ${Number(usu.coins).toLocaleString()} coins`, message.author.displayAvatarURL)
            .setThumbnail('https://cdn.discordapp.com/emojis/615770172653043723.gif?v=1')
        message.reply(embed)
        }
    })
})
}

exports.help = {
    name: "cointop",
    aliases: ["topcoins", "topmoney", "moneytop"]
}