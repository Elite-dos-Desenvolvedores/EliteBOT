const {
    Client,
    RichEmbed
} = require('discord.js');
const c = require('../config.json');
const isURL = require('isurl');

exports.run = async (client, message, args) => {
    const emoteName = args[0]
    const emoteURL = args[1]
    const emoteSize = emoteURL.size

    if (message.member.hasPermission("MANAGE_EMOJIS")) {
        message.guild.createEmoji(emoteURL, emoteName)
        const embed = new RichEmbed()
            .setTitle('Emoji adicionado')
            .setDescription(`O emoji ${emoteName} foi adicionado com sucesso!`)
            .setColor("RANDOM")
        message.channel.send(embed)
    } else {
        const embed = new RichEmbed()
            .setTitle('Erro')
            .setDescription('**Você não tem permissão para isso**.')
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    if (message.member.hasPermission('MANAGE_EMOJIS')) {
        if (!isURL(emoteURL)) {

            const embed = new RichEmbed()
                .setTitle('URL invalida')
                .setColor("RANDOM")
                .setDescription('Parece que essa URL esta invalida, tente novamente usando outra URL.')
            message.channel.send(embed)
        } else if (emoteSize < 256000) {
            const embed = new RichEmbed()
                .setTitle('Arquivo muito grande')
                .setColor("RANDOM")
                .setDescription(`Seu arquivo tem ${emoteSize} bytes, você pode tentar cortá-lo ou reduzir o tamanho. Ele precisa ser igual ou menor que 256000 bytes para que o emote seja adicionado.`)
            message.channel.send(embed)
        }
    }
}



exports.help = {
    name: "addemoji",
    descr: "Adiciona um emoji apartir de uma url.",
    arg: ['url']
}