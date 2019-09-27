    const Discord = require('discord.js')
    const c = require('../config.json')
    exports.run = async (client, message, args) => {
        await message.delete()
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))

        let mensg = args.join(' ')
        if (!mensg) {
            message.channel.send(`${message.author}, digite uma mensagem para anunciar. :mailbox_with_no_mail:`)
            return undefined;
        }

        const embed = new Discord.RichEmbed()
            .setAuthor('EdD - Anúncio', client.user.avatarURL)
            .setDescription(`${mensg}
        
    Atenciosamente,
    Equipe **Elite dos Desenvolvedores**.`)
            .setColor(c.cor)
            .setThumbnail(client.user.avatarURL)
            .setTimestamp()
            .setFooter(`Publicado por: ${message.author.username}`, message.author.avatarURL)
        client.channels.get(c.newsChannel).send('a').then(msg => msg.delete(2000))
        client.channels.get(c.newsChannel).send(embed)
    }

    exports.help = {
        name: "aviso",
        aliases: [
            "anuncio",
            "anunciar"
        ]
    }