const Discord = require("discord.js");

exports.run = async (client, message, args) => {
let cargo = message.guild.roles.find(cargo => cargo.name === "🔔 NOTIFICAR (!notificar)");
if (message.member.roles.has(cargo.id)) return message.reply("Você já está sendo notificado sobre todas minhas novidades");
message.channel.send(`${message.author}, agora você será notificado de todas novidades do servidor!`);
message.member.addRole(cargo.id);
}

exports.help = {
    name: 'notificar',
    aliases: []
}