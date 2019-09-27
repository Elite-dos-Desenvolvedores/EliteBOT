const Discord = require('discord.js')
const c = require('../config.json')

exports.run = function (bot, message, args) {
    if (args.length < 1) {
        message.channel.send(`Por favor, forneça um emoji.`)
        .then(message => setTimeout(() => message.delete(), 2000))
    }

    if (args[0].charCodeAt(0) >= 55296) {
        message.channel.send(`Não consegui aumentar esse emoji.`)
        .then(message => setTimeout(() => message.delete(), 2000))
    }

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

    if (!match || !match[1]) {
        message.channel.send(`Por favor, insira um emoji valido.`)
        .then(message => setTimeout(() => message.delete(), 2000))
    }

    const emoji = bot.emojis.get(match[1]);

    if (!emoji) {
        message.channel.send(`Não encontrei esse emoji!`)
        .then(message => setTimeout(() => message.delete(), 2000))
    }

    message.delete();
    message.channel.send({
        files: [
            emoji.url
        ]
    });
};

exports.help = {
    name: 'emoji',
    usage: 'emoji <emoji>',
    description: 'Cria um emoji em tamanho maior!'
};