const Discord = require("discord.js");
const c = require('../config.json');
const mergeImg = require('merge-img');

let global_count = 0;
module.exports.run = async (bot, message, args) => {
    let user1 = message.guild.member(message.mentions.users.firstKey());
    let user2 = message.guild.member(message.mentions.users.lastKey());
    if (!args[0] || (!args[0] && !args[1]) || !args[1]) {
        return message.channel.send(new Discord.RichEmbed()
            .setTitle('Uso incorreto do comando.')
            .setDescription("Tente usar: ``" + c.prefix + this.help.name + ` [${this.help.arg.join('][')}]` + "``")
            .setColor("#FF0000"));
    }

    let firstmention_id = args[0].slice(0, -1).replace(/[\\<>@#&!]/g, "");
    if (firstmention_id != user1.user.id) {
        await mergeImg([user2.user.displayAvatarURL + "?size=8192", user1.user.displayAvatarURL + "?size=8192"]).then((img) => {
            img.write(`img/couple_${message.guild.id}_${global_count}.png`, () => {
                return message.channel.send(new Discord.Attachment(`couple_${message.guild.id}_${global_count}.png`))
            })
        });
    } else {
        await mergeImg([user1.user.displayAvatarURL + "?size=8192", user2.user.displayAvatarURL + "?size=8192"]).then((img) => {
            img.write(`img/couple_${message.guild.id}_${global_count}.png`, () => {
                return message.channel.send(new Discord.Attachment(`couple_${message.guild.id}_${global_count}.png`))
            })
        });
    }

    console.log(`A foto do casal [couple_${message.guild.id}_${global_count}.png] foi criada.`);
}

module.exports.help = {
    name: "couple",
    aliases: ['casal'],
    descr: 'Junta ordenadamente a imagem de dois usuários.',
    arg: ['membro 1', 'membro 2']
}