const Database = require("../../database.js");
const Discord = require('discord.js')

exports.run = (client, message) => {

  Database.Reps.find().sort([
    ['reps', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);
    let i = 0;
    let embed = new Discord.RichEmbed()
      .setTitle("Top **5** - Recomendados")
      .setDescription('Use `!recomendar` para recomendar um usuário.')
      .setThumbnail(client.user.avatarURL)
      .setFooter(message.author.tag, message.author.avatarURL)
    if (res.length === 0) { //se o resultado for igual a 0
      embed.setColor("RANDOM");
      embed.addField("Nenhum usuario no banco de dados encontrado", "Colete recomendações para aparecer aqui.")
    } else if (res.length < 10) { // se o resultado menor q 5
      embed.setColor("RANDOM");
      for (i = 0; i < res.length; i++) {
        let member = client.users.get(res[i]._id)
        if (member) {
          embed.addField(`**${i + 1}**. ${member.username}#${member.discriminator}`, `**Reps**: ${res[i].reps}`);
        } else {
          embed.addField(`**${i + 1}**. ${member.username}#${member.discriminator}`, `**Reps**: ${res[i].reps}`);
        }
      }
    } else {
      embed.setColor("RANDOM");
      for (i = 0; i < 5; i++) {
        let member = client.users.get(res[i]._id)
        embed.addField(`**${i + 1}**. ${member.username}#${member.discriminator}`, `**Reps**: ${res[i].reps}`); 
      }
    }
    message.channel.send(embed)
  })
}
exports.help = {
  name: "toprep"
}