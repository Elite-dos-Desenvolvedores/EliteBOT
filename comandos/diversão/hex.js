const Discord = require('discord.js');

const validate = (color) => {
    if (!color || typeof color !== 'string') return false;
    color = color.replace('#', '');

    switch (color.length) {
        case 3:
            return /^[0-9A-F]{3}$/i.test(color);
        case 6:
            return /^[0-9A-F]{6}$/i.test(color);
        case 8:
            return /^[0-9A-F]{8}$/i.test(color);
        default:
            return false;
    }
};

exports.run = async (client, message, args) => {

    let hex = args.join(' ');
    let r = Number(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    try {
        if (!args[0]) return message.channel.send('Você precisa informar a cor em HEX');
        if (!validate(args.join(''))) return message.reply('Essa não é uma cor HEX valida!');

        message.channel.send(new Discord.RichEmbed().setColor(args[0]).setThumbnail(`http://placehold.it/500/${args[0]}/${args[0]}`).addField(`**HEX**: #${args[0]}`, `**RGB**: rgb(${r},${g},${b})`).setTimestamp());
    } catch (err) {
        message.channel.send('Aconteceu um erro!\n' + err).catch();
    }
};

exports.help = {
    name: 'hex',
    aliases: ['cor']
};