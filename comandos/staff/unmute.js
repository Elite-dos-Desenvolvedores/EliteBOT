const Discord = require("discord.js");
const c = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if (message.guild.member(message.author).hasPermission('MANAGE_ROLES')) {
        let unmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let muterole = message.guild.roles.find(role => role.name === 'Mutado');

        if (!unmute) {
            return message.channel.send(new Discord.RichEmbed()
                .setTitle("Uso incorreto do comando")
                .setDescription("Tente usar ``" + `${c.prefix}${this.help.name} ${this.help.arg}` + "``")
                .setColor('RANDOM'));
        }

        if (unmute.roles.has(muterole.id)) {
            unmute.removeRole(muterole.id);
            return client.channels.get('622533809455497257').send(new Discord.RichEmbed()
                .setTitle(`**${unmute.displayName}** foi desmutado.`)
                .setColor("RANDOM")            
                .setFooter(`Usuário desmutado por ${message.author.username}`)
                .setTimestamp()); 
        } else {
            return message.channel.send(new Discord.RichEmbed()
                .setTitle(`**${unmute.displayName}** não está mutado.`)
                .setColor("RANDOM"));
        }
    }
}

module.exports.help = {
    name: "unmute",
    description: 'Desmuta um membro já mutado no servidor.',
    arg: ['membro']
}