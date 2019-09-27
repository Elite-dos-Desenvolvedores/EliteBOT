const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (bot, message, args) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

   let dogembed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setTitle("Cachorros :dog:")
   .setImage(body.url);

   message.channel.send(dogembed);

}

exports.help = {
    name:"cachorro" 
 }