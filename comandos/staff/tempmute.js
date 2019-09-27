const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let msg = message;

    
    if(!message.member.roles.find(r => r.name === "Administrador") || message.member.roles.find(r => r.name === "Moderador")) return message.reply("**Você não tem permissão para isso.**");
    /*if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem permissão para isso.**");*/
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("defina o usuário a ser mutado");
    if (tomute.hasPermission("ADMINISTRATOR")) return message.reply("**você não pode mutar staffs.**");
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("insira um motivo");

    let muterole = msg.guild.roles.find(`name`, "Mutado");

    let mutetime = args[1];
    if (!mutetime) return message.reply("você precisa definir um tempo [1s/1m/1h/1d]");

    message.delete().catch(O_o => {});

    try {
        tomute.send(`Você foi mutado por ${mutetime}, o motivo é ${reason}.`)
    } catch (e) {
        message.channel.send(`${tomute} foi mutado por ${mutetime} `)
    }

    let muteembed = new Discord.RichEmbed()
        .setDescription(`**Mute**`)
        .setColor("RANDOM")
        .addField("Usuário", tomute, inline = true)
        .addField("Staff", message.author.username, inline = true)
        .setThumbnail(tomute.user.avatarURL, inline = true)
        .addField("Tempo", mutetime, inline = true)
        .addField("Motivo", reason, inline = true)
        .setFooter(tomute.user.id)
        .setTimestamp()
    msg.guild.channels.get(`622533809455497257`).send(muteembed);

    await (tomute.addRole(muterole.id));

    setTimeout(function () {
        tomute.removeRole(muterole.id);
        msg.guild.channels.get(`622533809455497257`).send(`<@${tomute.id}> foi desmutado.`);
    }, ms(mutetime));


}

exports.help = {
    name: "tempmute",
    description: "Muta um usuário por certo tempo",
    usage: "<user> <tempo> <motivo>",
    aliases: ["mute"]
}