var weather = require('weather-js');
const Discord = require('discord.js')


exports.run = (client, message, args) => {
    weather.find({
        search: args,
        degreeType: 'C'
    }, function (err, result) {
        if (err) console.log(err);
        //console.log(JSON.stringify(result, null, 2));
        if (!result) return message.channel.send(`Forneça uma cidade.`)
        if (!result[0]) return message.channel.send(`Essa cidade não existe.`)
        const embed = new Discord.RichEmbed()
            .setAuthor('Temperatura')
            .setDescription(`**Localização:** ${result[0].location.name}\n**Temperatura:** ${result[0].current.temperature}°C\n**Umidade:** ${result[0].current.humidity}%\n**Vento:** ${result[0].current.windspeed}`)
            .setColor("RANDOM")
            .setThumbnail(result[0].current.imageUrl)
            .setTimestamp()
        message.channel.send(embed)

    });
};

exports.help = {
    name: `tempo`,
    description: `Verifica o clima/tempo de uma cidade.`,
    usage: `tempo <cidade>`,
    aliases: [
        'clima'
    ]
};