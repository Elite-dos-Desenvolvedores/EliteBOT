const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))
    if (!args || args.length < 1) message.reply("digite o nome de algum cargo.");
    if (!args || args.length < 1) return;
    let role = message.guild.roles.find(role => role.name.toLowerCase() == args.join(" ").toLowerCase());
    if (!role) message.channel.send("Esse cargo não existe. Escreva o nome do cargo corretamente. (não diferencia letras maiúsculas de minúsculas)");
    if (!role) return;
    role.setMentionable(true, "Transforma um cargo em mencionavel por certo tempo.")
    message.channel.send(`O cargo **${args[0]}** agora é mencionável. Ele deixará de ser mencionável em 15 segundos.`);
    setTimeout(() => {
        role.setMentionable(false, "Desfazendo ação do comando.");
        message.channel.send(`O cargo **${args[0]}** deixou de ser mencionável.`);
    }, 15500);
};

exports.help = {
    name: 'rolemention'
}