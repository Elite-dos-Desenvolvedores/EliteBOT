const Discord = require('discord.js')
const c = require('../config.json')
exports.run = async (client, message, args) => {
    await message.author.createDM()
    message.delete()
    message.channel.send(`${message.author}, a verificação foi enviada em seu privado! 🕰`)
    message.author.send(`${message.author}, este é o sistema de verificação de cargos, responda-os!
    
    Caso seja **aprovado**, setaremos sua tag.
    Entretanto, caso seja **reprovado**, você será notificado que não foi aprovado.
    
    Para **cancelar** o envio, digite \`CANCELAR\` a qualquer momento da aplicação.
    Para **continuar** digite \`CONTINUAR\` aqui neste chat.`)

    var main = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
        time: 100000 * 50,
        max: 1
    })

    main.on('collect', a => {

        const pergun1 = new Discord.RichEmbed()
            .setColor(c.discord)
            .setDescription(`**0%** [\`..........\`] 
        \`\`\`fix
A qual cargo você deseja ser verificado?\`\`\` `)

        if (a.content.toLowerCase() === "cancelar") return message.author.send('O processo de requisição foi cancelado.');
        if (a.content.toLowerCase() === "continuar") message.author.send(pergun1)

        var prg2 = message.author.dmChannel.createMessageCollector(b => b.author.id == message.author.id, {
            time: 100000 * 50,
            max: 1
        })

        prg2.on('collect', b => {
            if (b.content.toLowerCase() === "cancelar") return message.author.send('O processo de requisição foi cancelado.');
            let n1 = b.content
            const pergun2 = new Discord.RichEmbed()
                .setColor(c.discord)
                .setDescription(`**33,3** [\`███.......\`] 
        \`\`\`fix
#2 - Qual o seu portfólio\`\`\``)
            message.author.send(pergun2)


            var prg3 = message.author.dmChannel.createMessageCollector(c => c.author.id == message.author.id, {
                time: 100000 * 50,
                max: 1
            })

            prg3.on('collect', c => {
                if (c.content.toLowerCase() === "cancelar") return message.author.send('O processo de requisição foi cancelado.');
                let n2 = c.content
                const pergun3 = new Discord.RichEmbed()
                    .setColor(c.discord)
                    .setDescription(`**66,6%** [\`██████....\`] 
        \`\`\`fix
#3 - Mande alguma prova de autoria.\`\`\``)
                message.author.send(pergun3)

                var fim = message.author.dmChannel.createMessageCollector(d => d.author.id == message.author.id, {
                    time: 100000 * 50,
                    max: 1
                })

                fim.on('collect', d => {
                    let n3 = d.content
                    const fimn = new Discord.RichEmbed()
                        .setColor(c.discord)
                        .setDescription(`**100%** [\`██████████\`] 
        \`\`\`fix
Seu pedido de verificação foi enviado!\`\`\``)
                    message.author.send(fimn)




                    const checked = client.emojis.find("name", "checked")
                    const unchecked = client.emojis.find("name", "unchecked")
                    const verif = new Discord.RichEmbed()
                        .setColor(c.discord)
                        .setDescription(`Um novo usuário solicitou verificação!

**•** Usuário: ${message.author}
**•** Ao cargo referente: **${n1}**
**•** Seu portfólio: **${n2}**
**•** Sua prova de autoria: **${n3}**
`)

                        .setFooter("Sistema de verificação de cargos", message.author.avatarURL)
                    client.channels.get('622563672493129806').send(verif).then(msg => {
                        msg.react(checked).then(r => {
                            msg.react(unchecked)

                            const aprovado = (reaction, user) => reaction.emoji === checked && user.id !== client.user.id;
                            const negads = (reaction, user) => reaction.emoji === unchecked && user.id !== client.user.id;

                            const aprovadoL = msg.createReactionCollector(aprovado);
                            const negadsL = msg.createReactionCollector(negads);

                            aprovadoL.on('collect', r => {
                                message.delete()
                                const aceito = new Discord.RichEmbed()
                                    .setColor(c.discord)
                                    .setDescription(`
                    \`\`\`fix
O seu pedido de verificação foi aceito e, sua tag será setada!\`\`\``)
                                message.author.send(aceito)



                                negadsL.on('collect', r => {

                                    const negado = new Discord.RichEmbed()
                                        .setColor(c.discord)
                                        .setDescription(`
                    \`\`\`fix
O seu pedido de verificação não foi aceito, checke seu portfólio e sua autoria!\`\`\``)
                                    message.author.send(negado)

                                })
                            })



                        })
                    })


                })
            })
        })
    })
}

exports.help = {
    name: "requisitar",
    aliases: [
        'reqtag',
        'pedirtag'
    ]
}