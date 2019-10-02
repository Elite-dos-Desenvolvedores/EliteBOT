const Discord = require('discord.js');
const c = require('../comandos/config.json');

exports.run = (oldMessage, newMessage, message) => {
    if (newMessage.channel.type === 'dm') return;
    if (oldMessage.content == newMessage.content) return;

    let logChannel = message.guild.channels.get(c.logChannel);
    if (!logChannel) return;

    if (newMessage.author.bot) return;

    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription('📝 **<@' + message.author.id + '> editou uma mensagem de texto**\n\n**Canal de texto:** <#' + message.channel.id + '>\n\n**Antiga mensagem**: \n```' + newMessage.content + '```\n\n**Nova mensagem**: \n```' + message.content + '``` ')
        .setColor("RANDOM")
        .setTimestamp()
    logChannel.send(embed);
}