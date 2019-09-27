const Discord = require("discord.js")
const config = require("../config.json");

exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("**Insira um texto para que eu faleeee.** `!say <texto>`");
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);

}

exports.help = {
    name: "say"
  }