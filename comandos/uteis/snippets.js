const Discord = require('discord.js')
const c = require('../config.json')
exports.run = async (client, message, args) => {
    await message.author.createDM

    const vv = client.emojis.find("name", "checked")
    const xx = client.emojis.find("name", "unchecked")
    message.delete()
    message.channel.send(`${message.author}, informações para o envio do seu snippet foram enviadas a sua DM.`).then(msg => msg.delete(5000))

    const embed = new Discord.RichEmbed()
        .setColor(c.cor)
        .setAuthor("EdD - Snippet de código", client.user.avatarURL)
        .setDescription("⠀\nDigite o título do seu snippet. ``` ```")
        .setFooter("© EdD", message.author.avatarURL)


    message.author.send(embed).catch(err => message.channel.send(`${message.author}, não consegui enviar mensagem a você, ative sua DM e tente novamente.`)).then(async msg => {

        var collector = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
            time: 1000 * 50,
            max: 1
        })
        collector.on('collect', a => {
            var nome = a.content

            const embeda = new Discord.RichEmbed()
                .setColor(c.cor)
                .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                .setDescription("⠀\nDigite a descrição do seu snippet.\n _Forneça para qual finalidade o código serve._ ``` ```")
                .addField("Envio em progresso.", `
\`📡\` Título: ${nome}`)
                .setFooter("© EdD", message.author.avatarURL)
            msg.edit(embeda)
            var collector = message.author.dmChannel.createMessageCollector(b => b.author.id == message.author.id, {
                time: 1000 * 50,
                max: 1
            })
            collector.on('collect', b => {
                var depend = b.content

                const embedb = new Discord.RichEmbed()
                    .setColor(c.cor)
                    .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                    .setDescription("⠀\nInsira a qual linguagem seu código pertence.\n _(HTML, CSS, Java, Javascript, PHP, Kotlin...)_ ``` ```")
                    .addField("Envio em progresso.", `
\`📡\` Título: ${nome}
\`💎\` Descrição: ${depend}`)
                    .setFooter("© EdD", message.author.avatarURL)
                msg.edit(embedb)
                var collector = message.author.dmChannel.createMessageCollector(c => c.author.id == message.author.id, {
                    time: 1000 * 50,
                    max: 1
                })
                collector.on('collect', c => {
                    var linguagem = c.content

                    const embedc = new Discord.RichEmbed()
                        .setColor(c.cor)
                        .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                        .setDescription("⠀\nInsira o código. ``` ```")
                        .addField("Envio em progresso.", `
\`📡\` Título: ${nome}
\`💎\` Descrição: ${depend}
\`💡\` Linguagem: ${linguagem}`)
                        .setFooter("© EdD", message.author.avatarURL)
                    msg.edit(embedc)

                    var collector = message.author.dmChannel.createMessageCollector(d => d.author.id == message.author.id, {
                        time: 1000 * 50,
                        max: 1
                    })
                    collector.on('collect', d => {
                        var codigo = d.content

                        const embedd = new Discord.RichEmbed()
                            .setColor(c.cor)
                            .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                            .setDescription("⠀\nConfirme seu snippet. ``` ```")
                            .addField("Envio em confirmação.", `
\`📡\` Título: ${nome}
\`💎\` Descrição: ${depend}
\`💡\` Linguagem: ${linguagem}
\`📪\` Código: ${codigo}`)
                            .setFooter("© EdD", message.author.avatarURL)
                        msg.edit(embedd).then(async r => {
                            await msg.react(vv)
                            await msg.react(xx)

                            let s = (r, u) => r.emoji.name === vv.name && u.id == message.author.id
                            let n = (r, u) => r.emoji.name === xx.name && u.id == message.author.id

                            let sL = msg.createReactionCollector(s, {
                                time: 120000
                            })
                            let nL = msg.createReactionCollector(n, {
                                time: 120000
                            })



                            sL.on('collect', async r => {
                                msg.reactions.map(re => re.remove(client.user))
                                const act = new Discord.RichEmbed()
                                    .setColor(c.cor)
                                    .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                                    .setDescription("⠀\nSeu pedido foi confirmado.. ``` ```")
                                    .addField("Pedido confirmado.", `
\`📡\` Título: ${nome}
\`💎\` Descrição: ${depend}
\`💡\` Linguagem: ${linguagem}
\`📪\` Código: ${codigo}`)
                                    .setFooter("© EdD", message.author.avatarURL)
                                msg.edit(act)

                                const pedido = new Discord.RichEmbed()
                                    .setColor(c.cor)
                                    .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                                    .setDescription(`⠀\nCódigo enviado por: ${message.author}`)
                                    .addField("Informações do snippet.", `
\`📡\` Título: ${nome}
\`💎\` Descrição: ${depend}
\`💡\` Linguagem: ${linguagem}
\`📪\` Código: \`\`\`${linguagem}\n${codigo}\`\`\``)
                                    .setFooter("Quer enviar um snippet? Use `!codigo` na sala `#🤖 comandos` © EdD", message.author.avatarURL)
                                client.channels.get("622623382940155915").send(pedido)

                            })

                            nL.on('collect', async r => {
                                msg.reactions.map(re => re.remove(client.user))
                                const act = new Discord.RichEmbed()
                                    .setColor(c.cor)
                                    .setAuthor("EdD - Snippet de código", client.user.avatarURL)
                                    .setDescription("⠀\nSeu envio foi cancelado... ``` ```")
                                    .setFooter("© EdD", message.author.avatarURL)
                                msg.edit(act)
                            })
                        })
                    })
                })
            })
        })
    })
}

exports.help = {
    name: "codigo",
    aliases: [
        'snippet'
    ]
}