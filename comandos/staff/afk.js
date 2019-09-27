const Discord = require('discord.js')
const c = require('../config.json')

exports.run = (client, message, args) =>{
    const setStatus = message.content.split(' ');

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg=> msg.delete(8000))

    if(setStatus[1] === 'on'){
        client.user.setAFK(true);
        message.channel.send("Seu status foi definido como ausente!");
    }

    else if(setStatus[1] === 'off'){
        client.user.setAFK(false);
        message.channel.send(`Bem vindo novamente ${message.author}`);
    }

    else if(!setStatus[1] || setStatus[1] === undefined){
        message.channel.send("Você não definiu um status!");
    }

    else{
        message.channel.send("Você não definiu um status!");
    }

}

exports.help = {
    name: 'afk',
    description: 'Define seu status como ausente',
    usage: 'afk'
};