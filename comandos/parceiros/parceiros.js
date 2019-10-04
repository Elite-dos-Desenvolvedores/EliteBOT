const Discord = require('discord.js')
const c = require('../config.json')
const cooldown = new Set()


exports.run = async (client, message, args) => {
    await message.delete()

    if (cooldown.has(message.author.id)) {
        message.delete()
        return message.reply("aguarde 24 horas para enviar um novo anuncio.").then(msg => msg.delete(5000))
    }

    

    if (!message.member.roles.find(role => role.name === "Parceiro")) {
        return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))
    }

    let mensg = args.join(' ')
    if (!mensg) {
        message.channel.send(`${message.author}, digite uma mensagem para anunciar. :mailbox_with_no_mail:`)
        return undefined;
    }

    const embed = new Discord.RichEmbed()
        .setAuthor('EdD - Parceiro', client.user.avatarURL)
        .setDescription(`${mensg}`)
        .setColor('RANDOM')
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        .setFooter(`Publicado por: ${message.author.username}`, message.author.avatarURL)
    client.channels.get('628959326173921311').send('<@625528878655340554>').then(msg => msg.delete(2000))
    client.channels.get('628959326173921311').send(embed)

    cooldown.add(message.author.id)


    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, 86400000)
}

exports.help = {
    name: "parceiro"
}