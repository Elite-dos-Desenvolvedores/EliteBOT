const Discord = require('discord.js')
const c = require('../config.json');

exports.run = async (bot, message, args) => {

    var motivo = args.slice(1).join(" ")
    var member = message.mentions.users.first() || bot.users.get(args[0]);


    if (message.mentions.users.size === 0) {
        return message.reply("Por favor, mencione um usuário para ser banido!");
    }

    let banmember = message.guild.member(message.mentions.users.first());
    if (!banmember) {
        message.reply("Este usuário não pode ser banido!");
    }

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Você não tem permissão para usar este comando`);

    message.channel.send(`Você tem certeza que deseja banir ${member} do seu servidor? (Reaja com ✅ para confirmar o ban) `)
        .then(async (msg) => {
            await msg.react("✅")
            await msg.react("⏹")
            const filter = (reaction, user) => ['✅', '⏹'].includes(reaction.emoji.name) && user.id === message.author.id
            const collector = msg.createReactionCollector(filter)
            collector.on("collect", r => {

                switch (r.emoji.name) {
                    case '✅':


                        const embed = new Discord.RichEmbed()
                            .setDescription(`**Banimento**`)
                            .setColor("RANDOM")
                            .addField("Usuário", `${member}`, true)
                            .addField("Staff", message.author.username, true)
                            .setThumbnail(member.displayAvatarURL)
                            .addField("Motivo", `${motivo}`, true)
                            .setFooter(`${member.id}`)
                            .setTimestamp()

                        message.guild.channels.get(c.punishChannel).send(embed);

                        message.guild.member(member).ban(motivo).catch(e => message.channel.send("Oporra o bixo e tão pesado que meu martelo nem tirou ele do lugar ;-;"));
                        break;
                    case '⏹':
                        msg.delete().then(message.channel.send(`Essa foi por pouco né ${member}?`));
                        break;
                }
            })
        })
}

exports.help = {
    name: "ban"
}