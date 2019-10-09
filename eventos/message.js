const timexp = new Set()
exports.name = 'message';
exports.run = (client, message) => {
    if (message.author.bot) return;
    if (timexp.has(message.author.id)) return;
    timexp.add(message.author.id)
    setTimeout(() => {
        timexp.delete(message.author.id)
    }, 5000);
    client.Database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {
        if (documento) {
            documento.xp += 10
            if (documento.xp > documento.level * 1000) {
                documento.level * 1000
                documento.level += 1
                message.channel.send(`${message.author}, você upou para o level ${documento.level}!`).then(msg => msg.delete(8000))
            }
            documento.save();


        } else {
            new client.Database.Users({
                _id: message.author.id,
                user: message.author.tag,
                level: 1,
                xp: 10
            }).save();
        }
    })

    if (["discord.gg/", "discordapp.com/invite/", "invite.gg/", "discord.io/", "discord.me/", "discord.plus/", "dis.gd/"].some(invite => message.content.includes(invite) && !message.content.includes("https://discord.gg/EhjgQ24"))) {
        message.delete().then(message.channel.send(`${message.author} você não pode enviar links de outros servidores aqui!`).then(msg => msg.delete(8000)))
    }

}