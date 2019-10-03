const Discord = require('discord.js');

const db = require('../../database.js');

exports.run = (message, args) => {
let member = message.mentions.users.first() ? message.mentions.users.first() : message.author
  db.Users.findOne({_id: member.id}, (err, user) =>{

if (err) throw err;

if (user) {
  let msg = message.mentions.users.first() ? ('Seus coins', { coins: user.coins }) : (' ', { coins: user.coins })
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