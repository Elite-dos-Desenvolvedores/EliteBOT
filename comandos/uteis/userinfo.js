const Discord = require('discord.js');
const moment = require("moment");
const c = require('../config.json')

const status = {
    online: "Online",
    idle: "Ausente",
    dnd: "Ocupado",
    offline: "Offline/Invisivel"
};

exports.run = (client, message, args) => {
    var permissions = [];
    var acknowledgements = 'Nenhum';

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    if (!member) return;
    const randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });

    if (member.hasPermission("KICK_MEMBERS")) {
        permissions.push("Kickar membros");
    }

    if (member.hasPermission("BAN_MEMBERS")) {
        permissions.push("Banir membros");
    }

    if (member.hasPermission("ADMINISTRATOR")) {
        permissions.push("Administrador");
    }

    if (member.hasPermission("MANAGE_MESSAGES")) {
        permissions.push("Gerenciar mensagens");
    }

    if (member.hasPermission("MANAGE_CHANNELS")) {
        permissions.push("Gerenciar canais");
    }

    if (member.hasPermission("MENTION_EVERYONE")) {
        permissions.push("Mencionar everyone");
    }

    if (member.hasPermission("MANAGE_NICKNAMES")) {
        permissions.push("Gerenciar nicknames");
    }

    if (member.hasPermission("MANAGE_ROLES")) {
        permissions.push("Gerenciar cargos");
    }

    if (member.hasPermission("MANAGE_WEBHOOKS")) {
        permissions.push("Gerenciar webhooks");
    }

    if (member.hasPermission("MANAGE_EMOJIS")) {
        permissions.push("Gerenciar emojis");
    }

    if (permissions.length == 0) {
        permissions.push("Nenhuma permissão encontrada");
    }

    if (`<@${member.user.id}>` == message.guild.owner) {
        acknowledgements = 'Criador do Servidor';
    }





    client.Database.Users.findOne({
        "_id": member.user.id
    }, function (erro, documento) {
        client.Database.Reps.findOne({
            "_id": member.user.id
        }, function (erro, doc) {

            const erross = new Discord.RichEmbed()
                .setAuthor(`${member.user.tag}`, client.user.avatarURL)
                .setDescription(`${message.author}, o usuario não possui um perfil registrado.`)
                .setTimestamp()
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)

            if (!documento) return message.channel.send(erross).then(msg => msg.delete(8000))

            const noreps = new Discord.RichEmbed()
                .setDescription(`<@${member.user.id}>`)
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
                .setColor(randomColor)
                .setFooter(`ID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL)
                .setTimestamp()
                .addField("Status", `${status[member.user.presence.status]}`, true)
                .addField('Entrou em: ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
                .addField("Conta criada em: ", `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
                .addField(`Cargo [${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Nenhum cargo"}`)
                .addField("Level", `${documento.level}`, true)
                .addField("XP", `${documento.xp}`, true)
                .addField("Portfolio", `${documento.portfolio}`, true)
                .addField("Reputação: ", `0`, true)
                .addField("Coins: ", `${documento.coins}`, true);

            if (!doc) return message.channel.send(noreps)

            const embed = new Discord.RichEmbed()
                .setDescription(`<@${member.user.id}>`)
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
                .setColor(randomColor)
                .setFooter(`ID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL)
                .setTimestamp()
                .addField("Status", `${status[member.user.presence.status]}`, true)
                .addField('Entrou em: ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
                .addField("Conta criada em: ", `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
                .addField(`Cargo [${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Nenhum cargo"}`)
                .addField("Level", `${documento.level}`, true)
                .addField("XP", `${documento.xp}`, true)
                .addField("Portfolio", `${documento.portfolio}`, true)
                .addField("Reputação: ", `${doc.reps}`, true)
                .addField("Coins: ", `${documento.coins}`, true);

            message.channel.send({
                embed
            });

        })
    })
}
exports.help = {
    name: 'userinfo',
    description: 'Verifica as informações de um usuário',
    usage: 'userinfo <NICK>',
    aliases: ['user']
};