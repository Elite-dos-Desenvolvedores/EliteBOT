const discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
    let minimum = await parseInt(args[0]);
    let maximum = await parseInt(args[1]);

    if (!args[0])
        return message.reply(`seu numero é **${Math.floor(Math.random() * 100 + 1)}**`);

    if (minimum < 1 || !minimum)
        return message.channel.send(new discord.RichEmbed()
            .setTitle('Uso incorreto do comando')
            .setDescription(
                '``' + `${c.prefix}${this.help.name}` + '``\n' +
                '``' + `${c.prefix}${this.help.name} [${this.help.arg[1]}]` + '``\n' +
                '``' + `${c.prefix}${this.help.name} [${this.help.arg.join('] [')}]` + '``')
            .setColor('#FF0000'));

    if (!maximum)
        return message.reply(`seu numero é **${Math.floor(Math.random() * minimum + 1)}**`);
    else
        return message.reply(`seu numero é **${Math.floor(Math.random() * (maximum - minimum + 1)) + minimum}**`);
}

module.exports.help = {
    name: 'random',
    descr: 'Mostra um numero aleatório entre dois valores.',
    arg: ['minimo', 'maximo']
}