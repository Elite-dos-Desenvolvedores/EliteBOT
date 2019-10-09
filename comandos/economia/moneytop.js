const Database = require("../../database.js");
const Discord = require('discord.js')

exports.run = (client, message) => {

  Database.Users.find().sort([
    ['coins', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);
    let i = 0;
    let embed = new Discord.RichEmbed()
      .setTitle("Top **10** - Money")
      .setDescription('Use `!daily` para coletar coins diariamente.')
      .setThumbnail(client.user.avatarURL)
      .setFooter(message.author.tag, message.author.avatarURL)
      .setTimestamp()
    if (res.length === 0) { //se o resultado for igual a 0
      embed.setColor("RANDOM");
      embed.addField("Nenhum usuario no banco de dados encontrado", "Colete coins para aparecer aqui.")
    } else if (res.length < 10) { // se o resultado menor q 5
      embed.setColor("RANDOM");
      for (i = 0; i < res.length; i++) {
        let member = client.users.get(res[i]._id)
        if (member) {
          embed.addField(`**${i + 1}**. ${member.username}#${member.discriminator}`, `**Money**: ${res[i].coins}`);
        } else {
          embed.addField(`**${i + 1}**. ${member.username}#${member.discriminator}`, `**Money**: ${res[i].coins}`);
        }
      }
    } else {
      embed.setColor("RANDOM");
      for (i = 0; i < 5; i++) {
        let member = client.users.get(res[i]._id)
        embed.addField(`**${i + 1}**. ${member.username}#${member.discriminator}`, `**Money**: ${res[i].coins}`); //adicionamos na embed o nome e os coins do usuario
      }
    }
    message.channel.send(embed)
  })
}
exports.help = {
  name: "cointop",
  aliases: ["topcoins", "topmoney", "moneytop"]
}