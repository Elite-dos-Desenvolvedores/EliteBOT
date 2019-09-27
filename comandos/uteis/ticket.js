const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Não tenho permissão de gerenciar canais')
    if (message.guild.channels.find(ch => ch.name.includes(message.author.id))) return message.reply('já existe um canal criado pra você 🐒')
    
    let channel 
    try {
        channel = await message.guild 
            .createChannel(`${message.member.displayName}•${message.author.discriminator}┋${message.author.id}`,
                {permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ['READ_MESSAGES'],
                },
                {
                    id: message.author.id,
                    allow: ['READ_MESSAGES', 'SEND_MESSAGES']
                }]
            })
        }
    catch(err) {
        message.channel.send('Erro: ' + err.message) 
    }
        
        let timeout = await channel.send(`<@${message.author.id}>`)
            .catch(err => message.channel.send('Erro: ' + err.message))
        timeout.delete(5000)
        setTimeout(() => channel.delete()
            .then(c => message.channel.send(`Canal \`${c.name}\` de <@${message.author.id}> foi deletado!`))
            .catch(err => message.channel.send('Erro: ' + err.message)), 1000 * 60) 
}

exports.help = {
    name: 'ticket',
    aliases: ['tickets']
}