const Discord = require('discord.js');
const c = require('../comandos/config.json');

exports.run = (client, message) => {
    let logChannel = message.guild.channels.get(c.logChannel);
    if (!logChannel) return;

    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription('📝 **Mensagem de texto deletada**\n\n**Canal de texto:** <#' + message.channel.id + '>\n\n**Mensagem**: \n```' + message.content + '```')
        .setColor("RANDOM")
        .setTimestamp()
    logChannel.send(embed);

}