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
        .addField(`⚙️ **Staff**`, '• `ban`, `mute`, `chat`, `limpar`...')
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        .setColor('RANDOM')
    message.author.send(embed).catch(err => message.channel.send(erros)).then(async msg => {
        await msg.react('⭐')
        await msg.react('📥')
        await msg.react('👦')
        await msg.react('😂')
        await msg.react('🎶')
        await msg.react('⚙️')
        await msg.react("↩")


        const informacao = (reaction, user) => reaction.emoji.name === '⭐' && user.id === message.author.id;
        const pedidos = (reaction, user) => reaction.emoji.name === '📥' && user.id === message.author.id;
        const usuario = (reaction, user) => reaction.emoji.name === '👦' && user.id === message.author.id;
        const diversao = (reaction, user) => reaction.emoji.name === '😂' && user.id === message.author.id;
        const musica = (reaction, user) => reaction.emoji.name === '🎶' && user.id === message.author.id;
        const staff = (reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id;

        const back = (reaction, user) => reaction.emoji.name === "↩" && user.id === message.author.id;

        const informacaoL = msg.createReactionCollector(informacao)
        const usuarioL = msg.createReactionCollector(usuario)
        const pedidosL = msg.createReactionCollector(pedidos)
        const diversaoL = msg.createReactionCollector(diversao)
        const musicaL = msg.createReactionCollector(musica)
        const staffL = msg.createReactionCollector(staff)

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
                .addField(`⚙️ **Staff**`, '• `ban`, `mute`, `chat`, `limpar`...')
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
                !lembrete \`<tempo>\` \`<lembrete>\` - Te lembra de algo importante.
                !notificar - Recebe a tag 🔔 NOTIFICAR (!notificar) e recebe novidades do servidor.
                !desnotificar - Remove a tag 🔔 NOTIFICAR (!notificar).
                !rank - Mostra o rank de XP.
                !topmoney - Mostra o rank de money.
                !ping - Mostra o delay bot-servidor.
                !toprep - Mostra o rank de recomendações.
                !codigo - Usado para enviar códigos snippets na sala 💾 snippets de códigos.
                !imgur \`<img>\` - Faz upload de uma imagem para o Imgur.


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
                        
                !apresentar - Apresente-se em nosso servidor.
                !setportfolio \`<url>\` - Adiciona ou altera o link do seu portfolio.
                !recomendações - Mostra seus pontos de recomendação.
                !recomendar - \`<@user>\` - Recomende um usuário.

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
                !emojify \`<texto>\`- Transforma seus textos em emojis.
                !random - Mostra aleatoriamente um número.
                !say \`<mensagem>\` - Faz com que eu repita uma frase.
                !aquelacarinha - Aquela carinha. ( ͡ʘ ͜ʖ ͡ʘ)
                !guess - Acerte o número aleatório em 10 tentativas.
                !8ball \`<mensagem>\` - Responde suas perguntas.
                !biscoito \`<usuário>\` - Da um biscoito para um usuário. 🍪
                !tapa \`<usuário>\` - Da um tapa em um usuário.
                !morse \`<mensagem>\` - Transforma um texto em código morse.
                !hex \`<código hex>\` - Mostra o hex e o rgb de uma cor.
                !dog - Mostra uma imagem fofinha de cachorro.
                !cat - Mostra uma imagem fofinha de gato.
                !triggerd \`<usuário>\` - Deixa um usuário irritado.
                !faketweet \`<usuário>\` \`<mensagem>\` - Cria um tweet fake apartir de um usuário.
                !primeiraspalavras \`<mensagem>\` - Cria o meme das primeiras palavras.

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

        staffL.on('collect', r => {
            const embeddiversao = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} - Ajuda`)
                .setDescription(`⚙️ **Staff**
                        
                !ban \`<usuário>\` \`<razão>\` - Bane um usuário.
                !mute \`<usuário>\` \`<tempo>\` \`<razão>\` - Muta um usuário por certo tempo.
                !unban \`<usuário>\` - Desbane um usuário.
                !unmute \`<usuário>\` - Desmuta um usuário.
                !slowmode \`<tempo>\` - Define o tempo do slowmode para uma sala.
                !limpar \`<quantidade>\` - Limpa uma certa quantia de mensagens. (1 a 100)
                !addemoji \`<nome>\` \`<url>\` - Adiciona um emoji ao servidor apartir de uma url.
                !listban - Envia no privado uma lista dos usuários banidos do servidor.
                !spacemychannel \`<canal>\` - Remove hifens do nome de um canal.
                !embed \`<mensagem>\` - Cria um embed apartir de uma mensagem.
                !setparceiro \`<usuário>\` - Define um usuário como parceiro.
                !setdoador \`<usuário>\` \`<tempo>\` - Define um usuário como doador por até 30 dias.
                !rolemention \`<id do cargo>\` - Muda o status de um cargo de não-mencionavel para mencionavel por 15 segundos.
 
        `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embeddiversao)
        })

    })
}

exports.help = {
    name: "ajuda",
    aliases: ['help']
}