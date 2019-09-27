exports.run = async(client, message, args) => {
    
    let user = message.mentions.users.first();
    if(user) {
        client.Database.Reps.findOne({ "_id": user.id }, function (erro, documento) {
            if(!documento) return message.channel.send(`O(a) <@${user.id}> não possui nenhum pontos de reputação.`)
            if(documento) {
                message.channel.send(`O(a) <@${user.id}> possui **${documento.reps}** pontos de reputação.`)
            }
        })
    }else{
        client.Database.Reps.findOne({ "_id": message.author.id }, function (erro, documento) {
            if(!documento) return message.channel.send(`${message.author}, você não possui nenhum pontos de reputação.`)
            if(documento) {
                message.channel.send(`${message.author}, você possui **${documento.reps}** pontos de reputação.`)
            }
        })
    }




}
exports.help = {
    name: "recomendações",
    aliases: [
        'reps'
    ]
}