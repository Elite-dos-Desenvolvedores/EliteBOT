const Discord = require("discord.js");
const Fortnite = require("fortnite");
const fortnite = require("../config.json")
const ft = new Fortnite(fortnite.fortnite)

module.exports.run = async (data, message, args) => {

    let username = args.join(` `)
    if(!username) return message.channel.send("Insira o nome de um jogador para ver seus status.")
    let platform = args[1];

    let data = ft.getInfo(username).then(data => {

        const url = 'https://i.imgur.com/y29m0wF.png';

        let stats = data.lifetimeStats;
        let kills = stats.find(s => s.stat == "kills");
        let wins = stats.find(s => s.stat == "wins");
        let top5s = stats.find(s => s.stat == "top5s");
        let kd = stats.find(s => s.stat == "kd");
        let mPlayed = stats.find(s => s.stat == "matchesPlayed");
        let top3 = stats.find(s => s.stat == "top3");
        let score = stats.find(s => s.stat == "score");
        let tPlayed = stats.find(s => s.stat == "timePlayed");

        let embed = new Discord.RichEmbed()
        .setTitle(`Status de ${data.username} no Krunker`)
        .setThumbnail(url)
        .setColor("RANDOM")
        .addField("Kills", kills.value, true)
        .addField("Vitórias", wins.value, true)
        .addField("KDR", kd.value, true)
        .addField("Top 3", top3.value, true)
        .addField("Partidas Jogadas", mPlayed.value, true)
        .addField("Tempo jogado", tPlayed.value, true)
        .setFooter(`Score de ${data.username} é: ${score.value}`)
        .setTimestamp();

        message.channel.send(embed);

    }).catch(e => {
        console.log(e)
        message.channel.send("Não foi possível encontrar um usuário com esse nick.");
    });

}

module.exports.help = {
  name: "fortnite"
}