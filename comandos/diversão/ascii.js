const discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (message, args, texts) => {
    let text = encodeURIComponent(args.join(' '));
    if (!text) return message.channel.send("Você precisa informar um texto para converter para ASCII.");
    const tooLong = "O texto é muito longo, tente um texto menor.";

    fetch(`http://artii.herokuapp.com/make?text=${text}`)
        .then(res => res.text())
        .then(body => {
            if (body.length > 2000) return message.channel.send(tooLong);
            return message.channel.send(body, {
                code: "fix"
            });
        })
        .catch(error => {
            this.client.logger.error(error);
            return message.channel.send(texts.general.error.replace(/{{err}}/g, error.message));
        });
}

exports.help = {
    name: 'ascii'
}