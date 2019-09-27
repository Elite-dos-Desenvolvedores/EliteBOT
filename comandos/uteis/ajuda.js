const Discord = require('discord.js');
const c = require('../config.json')

module.exports.run = async (client, message, args) => {
    message.delete()

    const erros = new Discord.RichEmbed()
        .setAuthor("Elite dos Desenvolvedores - Erro", client.user.avatarURL)
        .setDescription(`${message.author}, não consigo enviar mensagem para você, ative suas mensagens diretas!`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setColor('RANDOM')

    const yes = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} - Ajuda`)
        .setDescription(` ${message.author}, enviei meus comandos em seu privado!`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(message.author.tag, message.author.avatarURL)
    message.channel.send(yes).then(msg => msg.delete(12000))

    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} - Ajuda`)
        .setDescription(`Para saber meus comandos, reaja ao emoji de cada categoria.`)
        .addField(`⭐ **Informações**`, '• `ajuda`, `server`, `user`, `sugerir`, `avatar`...')
        .addField(`📥 **Pedidos**`, '• `plugin`, `web`, `outros`...')
        .addField(`👦 **Usuário**`, '• `portfolio`, `recomendações`, `reputação`...')
        .addField(`😂 **Diversão**`, '• `bigtext`, `lenny`, `coinflip`, `dados`...')
        .addField(`🎶 **Música**`, '• `play`, `stop`, `skip`, `playlist`...')
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        .setColor('RANDOM')
    message.author.send(embed).catch(err => message.channel.send(erros)).then(async msg => {
        await msg.react('⭐')
        await msg.react('📥')
        await msg.react('👦')
        await msg.react('😂')
        await msg.react('🎶')
        await msg.react("↩")


        const informacao = (reaction, user) => reaction.emoji.name === '⭐' && user.id === message.author.id;
        const pedidos = (reaction, user) => reaction.emoji.name === '📥' && user.id === message.author.id;
        const usuario = (reaction, user) => reaction.emoji.name === '👦' && user.id === message.author.id;
        const diversao = (reaction, user) => reaction.emoji.name === '😂' && user.id === message.author.id;
        const musica = (reaction, user) => reaction.emoji.name === '🎶' && user.id === message.author.id;

        const back = (reaction, user) => reaction.emoji.name === "↩" && user.id === message.author.id;

        const informacaoL = msg.createReactionCollector(informacao)
        const usuarioL = msg.createReactionCollector(usuario)
        const pedidosL = msg.createReactionCollector(pedidos)
        const diversaoL = msg.createReactionCollector(diversao)
        const musicaL = msg.createReactionCollector(musica)

        const backL = msg.createReactionCollector(back)


        backL.on('collect', r => {
            const embedd = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`Para saber meus comandos, reaja ao emoji de cada categoria.`)
                .addField(`⭐ **Informações**`, '• `ajuda`, `server`, `user`, `sugerir`, `avatar`, ...')
                .addField(`📥 **Pedidos**`, '• `plugin`, `web`, `outros`')
                .addField(`👦 **Usuário**`, '• `portfolio`, `recomendações`, `reputação`...')
                .addField(`😂 **Diversão**`, '• `bigtext`, `lenny`, `coinflip`, `dados`...')
                .addField(`🎶 **Música**`, '• `play`, `stop`, `skip`, `playlist`...')
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
                .setColor("RANDOM")
            msg.edit(embedd)
        })

        informacaoL.on('collect', r => {

            const embedinformacao = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`⭐ **UTEIS**

                !ajuda - Exibe o menu de ajuda.
                !server - Mostra status do servidor.
                !user - Mostra o perfil do usuário.
                !bot - Mostra informações sobre mim.
                !sugerir \`<sugestão>\` - Crie uma sugestão para melhorar nosso servidor.
                !avatar - Mostra o avatar de um usuário ou do próprio usuário que usou o comando.
                !invites - Mostra o rank de convites.
                !lembrete - Te lembra de algo importante.
                !notificar - Recebe a tag 🔔 NOTIFICAR (!notificar) e recebe novidades do servidor.
                !rank - Mostra o rank de XP.
                !recomendar \`<usuario>\` - Da um ponto de recomendação ao usuário.
                !reps - Mostra a quantidade de recomendações que você recebeu.
                !toprep - Mostra o rank de recomendações.
                !codigo - Usado para enviar códigos snippets na sala 💾 snippets de códigos.
                !setportfolio \`<url>\` - Define a url do seu portfolio.
                !portfolio - Mostra a url do seu portfolio.

         `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embedinformacao)
        })

        pedidosL.on('collect', r => {

            const embedpedidos = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`📥 **PEDIDOS**

                !plugin - Faça um pedido relacionado a plugins!
                !web - Faça um pedido relacionado a web!
                !outros - Faça um pedido de algo não listado!
         `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embedpedidos)
        })

        usuarioL.on('collect', r => {
            const embedusuario = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`👦 **USUARIO**
                        
                !portfolio \`<@user>\` - Vê o portfolio de um usuário.
                !setportfolio \`<portfolio>\` - Defina seu portfolio.
                !recomendações - Veja o suas recomendações.
                !recomendar - \`<@user>\` - Recomende um usuário.
                !reputação - Veja o top recomendações.

        `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embedusuario)
        })

        diversaoL.on('collect', r => {
            const embeddiversao = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`😂 **DIVERSÃO**
                        
                !dados \`<quantidade>\` - Joga até 5 dados na mesa.
                !coinflip - Joga moeda para cima.
                !emojify - Transforma seus textos em emojis.
                !random - Mostra aleatoriamente um número.
                !say \`<mensagem>\` - Faz com que eu repita uma frase.
                !aquelacarinha - Aquela carinha. ( ͡ʘ ͜ʖ ͡ʘ)
                !casal \`<@user1> <@user2>\` - Cria uma foto do casal.
                !guess - Acerte o número aleatório em 10 tentativas.

        `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embeddiversao)
        })

        musicaL.on('collect', r => {
            const embeddiversao = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`🎶 **Música**
                        
                !play \`<nome da música/url>\` - Escolhe uma música para tocar.
                !stop - Para a música.
                !skip - Pula uma música.
                !playlist - Mostra aleatoriamente um número.
                !pause - Pausa a música.
                !resume - Retoma a música.
                !tocando - Mostra a música que esta tocando no momento.
                !volume \`<altura>\` - Define o volume da música.

        `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embeddiversao)
        })

    }) // https://cdn.discordapp.com/emojis/520666775638114309.gif?v=1
} // final


exports.help = {
    name: "ajuda",
    aliases: [
        'help'
    ]
}