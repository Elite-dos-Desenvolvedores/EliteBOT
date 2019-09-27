exports.run = async(client, message, args) => {
     let user = message.mentions.users.first();
     if(user) {
        client.Database.Users.findOne({_id: user.id}, function (erro, documento) {
            message.channel.send(`O portfólio de <@${user.id}> foi definido como ${documento.portfolio}.`)
        })

     }else{
        client.Database.Users.findOne({_id: message.author.id}, function (erro, documento) {
            message.channel.send(`O portfólio de ${message.author} foi definido como ${documento.portfolio}.`)
        })

     }
}
exports.help = {
    name: "portfolio",
    aliases: [
        'port',
        'album'
    ]
}