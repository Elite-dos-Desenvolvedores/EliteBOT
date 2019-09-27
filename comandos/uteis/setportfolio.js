exports.run = async (client, message, args) => {
    message.delete()
    let msg = args[0]
    if(!msg) return message.reply('utilize um link com `[http ou https] para definir seu portfólio.`')
    if(!msg.startsWith('http://') === !msg.startsWith('https://')) return message.reply("utilize um link com `[http ou https]` para definir seu portfólio.");
    
    client.Database.Users.findOne({_id: message.author.id}, function (erro, documento) {
        if(documento) {
            documento.portfolio = msg
            documento.save()
            message.channel.send(`${message.author}, seu portfólio foi definido para: ${msg}`)
        
        }else{
            new client.Database.Users({
                _id: message.author.id,
                portfolio: msg
            }).save()
            message.channel.send(`${message.author}, seu portfólio foi definido para: ${msg}`)
        
        
        }
    })
}

exports.help = {
    name: "setportfolio",
    aliases: [
        'setport'
    ]
}