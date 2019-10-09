const Dicord = require("discord.js")
const Database = require('../../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = (client, message, args ) => {
  client.Database.Users.findOne({
    '_id': message.author.id
  }, function (err, documento) {
    if (documento) {
      let valor = documento.equipe ? 150 : documento.doador ? 250 : documento.parceiro ? 200 : 100
      var tempo = moment.duration.format([moment.duration((parseInt(documento.dailytime) + 86400000) - Date.now())], 'D MMMM YYYY, h:mm:ss')
     if ((parseInt(documento.dailytime) + 86400000) <= (Date.now())) {
        documento.coins += valor
        documento.dailytime = Date.now()
        documento.save()
        message.channel.send(`Você recebeu ${valor} coins`)
      } else {
        message.channel.send(`Você só pode pegar seus coins diários daqui ${tempo}`)
      } 
    } else {
       message.channel.send("Ocorreu um erro ao executar o comando...")
    }
  })
}

exports.help = {
    name: 'daily',
    aliase: ['diario']
}