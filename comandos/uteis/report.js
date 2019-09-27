const discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let reports = message.guild.channels.find('name', config.reportsChannel);
    if (!target) return message.reply('por favor escolha um usuário para reportar!');
    if (!reason) return message.reply('por favor especifique o motivo da denuncia!');
    if (!reports) return message.reply(`Por favor crie um canal chamado ${config.reportsChannel} para armazenar as denuncias!`);
    if (target.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(new discord.RichEmbed()
            .setTitle('Permissões insuficientes')
            .setDescription("Você não pode reportar um **staff**.")
            .setColor('RANDOM'));
    }
    if (target.user.bot) {
        return message.channel.send(new discord.RichEmbed()
            .setTitle('Permissões insuficientes')
            .setDescription("Você não pode reportar um **bot**.")
            .setColor('RANDOM'));
    }


    if (target.id == message.author.id) return message.reply('você não pode reportar a si mesmo!');
    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField('Membro Reportado', `${target.user.username}`)
        .addField('Por', `${message.author.username}`)
        .setTimestamp(message.createdAt)
        .addField('Pelo Motivo', reason)
        .setFooter('Informações do usuário reportado', target.user.displayAvatarURL);

    message.channel.send(`${target} foi reportado por ${message.author} por **${reason}** com sucesso!`).then(msg => msg.delete(2000));
    reports.send(embed);

};

module.exports.help = {
    name: 'report',
    aliases: ['denunciar']
};