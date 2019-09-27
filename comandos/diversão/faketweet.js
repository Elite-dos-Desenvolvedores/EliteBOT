const Discord = require('discord.js');
const fetch = require("node-fetch");
exports.run = async (client, message, args, bot) => {
    let user = args[0];
    let text = args.slice(1).join(" ") || undefined;
    if (!user) return message.reply("você precisa fornecer um usuário para o tweet.");
    if (user.startsWith("@")) user = args[0].slice(1);
    const type = user.toLowerCase() === "realdonaldtrump" ? "trumptweet" : "tweet";
    const u = user.startsWith("@") ? user.slice(1) : user;
    if (!text) return message.reply("você precisa informar o tweet.");
    message.channel.startTyping();
    fetch(`https://nekobot.xyz/api/imagegen?type=${type}&username=${u}&text=${encodeURIComponent(text)}`)
        .then(res => res.json())
        .then(data => message.channel.send({
            file: data.message
        }))
        .catch(err => {
            this.client.logger.error(err.stack);
            message.channel.stopTyping(true);
            return this.client.embed("APIError", message);
        });
    message.channel.stopTyping(true);
}

exports.help = {
    name: 'faketweet',
    aliases: ['tweet']
}