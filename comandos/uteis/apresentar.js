const Discord = require('discord.js')
const c = require('../config.json')
exports.run = async (client, message, args) => {
    await message.author.createDM()
    message.delete()
    message.channel.send(`${message.author}, o processo de apresentação é feito pelo seu privado, te chamei lá!`)
    const embed = new Discord.RichEmbed()
        .setTitle('**Apresente-se**')
        .setDescription(`${message.author} bem-vindo ao sistema de apresentação, todas as informações insiridas aqui apareceram em seu perfil no nosso discord.
        \n Para cancelar a apresentação digite \`cancelar\` a qualquer momento no chat.
        \n  Para continuar digite \`continuar\` para iniciar a apresentação.`)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.avatarURL)
    message.author.send(embed)


    var main = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
        time: 100000 * 50,
        max: 1
    })

    main.on('collect', a => {

        const pergun1 = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`**0%** [\`----------\`] 
                                    \`\`\`fix
                            #1 - Insira seu nome:\`\`\` `)

        if (a.content.toLowerCase() === "cancelar") return message.author.send('O processo de apresentação foi cancelado.');
        if (a.content.toLowerCase() === "continuar") message.author.send(pergun1)

        var prg2 = message.author.dmChannel.createMessageCollector(b => b.author.id == message.author.id, {
            time: 100000 * 50,
            max: 1
        })

        prg2.on('collect', b => {
            if (b.content.toLowerCase() === "cancelar") return message.author.send('O processo de apresentação foi cancelado.');
            let n1 = b.content
            const pergun2 = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`**20%** [\`██--------\`] 
                                        \`\`\`fix
                                #2 - Insira sua data de aniversário: [dia/mês]\`\`\``)
            message.author.send(pergun2)


            var prg3 = message.author.dmChannel.createMessageCollector(c => c.author.id == message.author.id, {
                time: 100000 * 50,
                max: 1
            })

            prg3.on('collect', c => {
                if (c.content.toLowerCase() === "cancelar") return message.author.send('O processo de apresentação foi cancelado.');
                let n2 = c.content
                const pergun3 = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setDescription(`**40%** [\`████------\`] 
        \`\`\`fix
#3 - Insira uma breve descrição sobre você:\`\`\``)
                message.author.send(pergun3)

                var prg4 = message.author.dmChannel.createMessageCollector(d => d.author.id == message.author.id, {
                    time: 100000 * 50,
                    max: 1
                })

                prg4.on('collect', d => {
                    if (c.content.toLowerCase() === "cancelar") return message.author.send('O processo de apresentação foi cancelado.');
                    let n3 = d.content
                    const pergun4 = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setDescription(`**60%** [\`██████--\`] 
        \`\`\`fix
#4- Insira suas linguagens favoritas: [Java, Kotlin, Javascript, PHP...]\`\`\``)
                    message.author.send(pergun4)

                    var prg5 = message.author.dmChannel.createMessageCollector(d => d.author.id == message.author.id, {
                        time: 100000 * 50,
                        max: 1
                    })

                    prg5.on('collect', e => {
                        if (c.content.toLowerCase() === "cancelar") return message.author.send('O processo de apresentação foi cancelado.');
                        let n4 = e.content
                        const pergun5 = new Discord.RichEmbed()
                            .setColor("RANDOM")
                            .setDescription(`**80%** [\`████████--\`] 
        \`\`\`fix
#3 - Insira o link para seu portfolio: [Github ou site] \`\`\``)
                        message.author.send(pergun5)

                        var fim = message.author.dmChannel.createMessageCollector(d => d.author.id == message.author.id, {
                            time: 100000 * 50,
                            max: 1
                        })

                        fim.on('collect', f => {
                            let n5 = f.content
                            const fimn = new Discord.RichEmbed()
                                .setColor("RANDOM")
                                .setDescription(`**100%** [\`██████████\`] 
        \`\`\`fix
Sua apresentação foi enviada!\`\`\``)
                            message.author.send(fimn)




                            const checked = client.emojis.find("name", "checked")
                            const unchecked = client.emojis.find("name", "unchecked")
                            const apresentacao = new Discord.RichEmbed()
                                .setAuthor(`Apresentação de ${message.author}`, message.author.displayAvatarURL)
                                .setColor("RANDOM")
                                .addField('**Nome:**', n1)
                                .addField('**Nick:**', message.author)
                                .addField('**Aniversário:**', n2)
                                .addField('**Sobre mim:', n3)
                                .addField('**Linguagens favoritas:', n4)
                                .addField('**Portfolio:**', n5)
                                .setThumbnail(message.author.displayAvatarURL)
                                .setFooter("Quer se apresentar? Use !apresentar no canal de comandos.", message.author.avatarURL)
                            client.channels.get('630108453515296778').send(apresentacao)

                        })
                    })
                })
            })
        })
    })
}

exports.help = {
    name: "apresentar",
    aliases: [
        'apresentação'
    ]
}