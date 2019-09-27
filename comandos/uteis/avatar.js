const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = (client, message, args) => {
      let user = message.mentions.users.first() || message.author
      const embed = new Discord.RichEmbed()
            .setImage(user.displayAvatarURL)
            .setColor('RANDOM')
    message.channel.send({embed})
}

exports.help = {
    name: 'avatar',
    description: 'Mostra o avatar de um usuário',
    usage: 'avatar'
};