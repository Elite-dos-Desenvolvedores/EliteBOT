  
var database = require('../../database.js')

exports.run = (client, message) => {
  var usuarios = []
  var num = 0

  database.Users.find({}, function (erro, documento) {
    database.Users.findOne({
      '_id': message.author.id
    }, function (err, usu) {
      if (usu) {
        documento.filter(a => message.guild.members.get(a._id)).map(a => usuarios.push({
          user: a._id,
          coins: a.coins
        }))
        usuarios.sort(function (a, b) {
          return b.coins - a.coins
        })
        var moneytop = usuarios.map(a => '**' + (num += 1) + '** - ' + client.users.get(a.user).username + ' **' + Number(a.coins).toLocaleString() + ' coins.**').slice(0, 10).join('\n')
        message.channel.sendMessage({
          'embed': {
            'title': `:moneybag: TOP Money:`,
            'description': `${moneytop}`,
            'color': 'RANDOM',
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': `Sua pontuação: ${Number(usu.coins).toLocaleString()} coins.`
            }
          }
        })
      } else {
        message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
      }
    })
  })
}
exports.help = {
  name: "cointop",
  aliases: ["topcoins", "topmoney", "moneytop"]
}