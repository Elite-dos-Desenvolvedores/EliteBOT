const Dicord = require("discord.js")
const database = require('../../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = (message, args ) => {
  database.Users.findOne({
    '_id': member.user.id
  }, function (err, documento) {
    if (documento) {
      let valor = documento.Equipe ? 500 : documento.Doador ? 1000 : documento.Partner ? 1500 : 1200
      var tempo = moment.duration.format([moment.duration((parseInt(documento.dailytime) + 86400000) - Date.now())], 'hh:mm:ss')
     if ((parseInt(documento.dailytime) + 86400000) <= (Date.now())) {
        documento.coins += valor
        documento.dailytime = Date.now()
        documento.save()
        message.channel.send("Você recebebeu", { coins: valor })
      } else {
        message.channel.send("Você só pode pegar seus coins diários daqui", { time: tempo })
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