const Discord = require('discord.js');
const fs = require('fs');
var request = require('request');
const send = require('quick.hook');

module.exports.run = async (client, message, args) => {
    serverr = args[1];
    let url = "http://mcapi.us/server/status?ip=" + serverr;
    request(url, function (err, response, body) {

        if (!serverr) return message.reply("um erro aconteceu, insira um ip valido!")
        var status = "Offline";
        if (body.online) {
            status = "Online";
        }

        // PC Ping
        body = JSON.parse(body);

        let embed = new Discord.RichEmbed()
            .setAuthor(`${serverr}`, `https://mcapi.de/api/image/favicon/${serverr}`)
            .setThumbnail(`https://mcapi.de/api/image/favicon/${serverr}`)
            .addField("🎲 Versão:", body.server.name, true)
            .addField("🚀 Motd:", body.motd, true)
            .addField("🥊 Status:", body.online)
            .addField("🏵 Jogadores online:", body.players.now + "/" + body.players.max, true)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
        message.channel.send(embed)
    })
}

exports.help = {
    name: "mcstatus"
}