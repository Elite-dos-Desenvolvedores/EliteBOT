const Discord = require('discord.js')
const c = require('../config.json')

exports.run = async (client, message, args) => {
    try {
      if (!args[0]) return message.reply('Você precisa inserir o texto para reverter!');
      
      const str = args.join(' ');
      let msg = await message.reply(str.split('').reverse().join(''));
      msg.react('🔁');
    } catch (err) {
      message.channel.send('Aconteceu um erro!\n' + err).catch();
    }
  };
  
  exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: false,
    permLevel: 'ADMINISTRATOR'
  };
  
  exports.help = {
    name: 'reverse',
    description: 'Retorna o texto invertido',
    usage: 'reverse <text>'
  };