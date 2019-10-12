const KrunkerJS = require('krunker.js');
const Krunker = new KrunkerJS();
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    const nome = args[0]
    Krunker.getUser(nome).then(data => {
        if (!nome) return message.reply('insira o nick de um usuário para ver seu status!')

        const level = Krunker.getLevel(data);
        const timeplayed = Krunker.getPlayTime(data);
        const kdr = Krunker.getKDR(data);
        const wins = data.simplified.wins;
        const loses = data.simplified.loses;
        var clan = data.simplified.clan;
        const gamesplayed = data.simplified.totalGamesPlayed;
        const kills = data.simplified.kills
        const deaths = data.simplified.deaths

        if (gamesplayed === 0) return message.reply('esse usuário nunca jogou uma partida pública!')

        if (clan === 'No Clan') clan = 'Sem clã';
        if (level === 'Dados do usuário não foram encontrados');
        const embed = new Discord.RichEmbed()
            .setTitle(`Status de ${nome} no Krunker`)
            .setThumbnail(`https://krunker.io/img/levels/${level}.png`)
            .setColor('RANDOM')
            .addField(`**Nome**:`, `${nome}`)
            .addField(`**Level**:`, `${level}`)
            .addField(`**Tempo Jogado**:`, `${timeplayed}`)
            .addField(`**Kill/Deaths**:`, `${kdr} - (${kills}/${deaths})`)
            .addField(`**Vitórias/Derrotas**:`, `${wins}/${loses}`)
            .addField(`**Clã**:`, clan)
            .addField(`**Partidas Jogadas**:`, `${gamesplayed}`)
            .setTimestamp()

        message.channel.send({
            embed
        })

    }).catch(() => {
        message.channel.send(`${message.author} Esse usuario não existe. `).then(msg => msg.delete(5000));
    })
}

exports.help = {
    name: 'krunker'
}