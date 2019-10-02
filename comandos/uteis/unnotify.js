const Discord = require("discord.js");

exports.run = async (client, message, args) => {
let cargo = message.guild.roles.find(cargo => cargo.name === "🔔 NOTIFICAR (!notificar)");
if (!message.member.roles.has(cargo.id)) return message.reply("Você não está sendo notificado, para receber notificações use `!notificar`");
message.channel.send(`${message.author}, você não sera mais notificado!`);
message.member.removeRole(cargo.id);
}

exports.help = {
    name: 'desnotificar',
    aliases: []
}