const Discord = require('discord.js');
const c = require('../config.json');
let serversmap = new Map(); // List all the servers that the game is running

module.exports.run = async (bot, message, args) => {
    if (serversmap.has(message.guild.id)) {
        return message.channel.send(new Discord.RichEmbed()
            .setTitle('Erro')
            .setDescription('Já existe uma instância do jogo rodando neste servidor.')
            .setColor("#FF0000"));
    }

    // This collector only will get the message from the caller of the game
    let game_collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
        time: 1000 * 60 * 5 // 5 minutes to game timeout
    });

    let bot_collector = new Discord.MessageCollector(message.channel, m => m.author.id === bot.user.id, {
        time: 1000 * 60 * 5 // 5 minutes to game timeout
    });

    serversmap.set(message.guild.id, [game_collector, bot_collector]);

    // Default values for maximum and minimum, that will change depending on the difficulty selected
    let gameconfig = {
        maximum: Math.floor(Math.random() * 899) + 100, // random between 100 and 1000
        minimum: Math.floor(Math.random() * 100) + 1, // random between 1 and 100
        tries: 10,
        trycount: 0,
        title: ''
    }

    let random_number = Math.floor(Math.random() * (gameconfig.maximum - gameconfig.minimum + 1)) + gameconfig.minimum;
    message.channel.send(new Discord.RichEmbed()
        .setTitle('Descubra o número secreto')
        .setDescription(`Seu numero secreto está entre **${gameconfig.minimum}** e **${gameconfig.maximum}.**
        Você tem ${gameconfig.tries} chances de acerta-lo.
        
        Use ` + "``stop`` para terminar o jogo a qualquer momento.")
        .setColor('#00ffe5'))

    game_collector.on('collect', u_msg => {
        if (parseInt(u_msg.content) > gameconfig.maximum)
            return message.channel.send(new Discord.RichEmbed()
                .setTitle('Valor superior ao máximo')
                .setDescription(`**${u_msg.content}** é maior que o valor máximo de **${gameconfig.maximum}**`)
                .setColor('#FF0000'))

        if (parseInt(u_msg.content) < gameconfig.minimum)
            return message.channel.send(new Discord.RichEmbed()
                .setTitle('Valor inferior ao mínimo')
                .setDescription(`**${u_msg.content}** é menor que o valor mínimo de **${gameconfig.minimum}**`)
                .setColor('#FF0000'))

        if (u_msg.content === 'stop')
            return game_collector.stop('forced')

        if (parseInt(u_msg.content) === random_number) {
            if (gameconfig.trycount <= 1) gameconfig.title = 'Cagada';
            else if (gameconfig.trycount <= 2) gameconfig.title = 'Deus';
            else if (gameconfig.trycount <= 4) gameconfig.title = 'Frio e calculista';
            else if (gameconfig.trycount <= 6) gameconfig.title = 'Devagar';
            else if (gameconfig.trycount <= 8) gameconfig.title = 'Muito Lento';

            game_collector.stop('win');
        }

        if (gameconfig.tries === 1) return game_collector.stop('gameover');

        let dist = parseInt(u_msg.content) - random_number;
        if (dist < 0) dist *= -1;

        let tryplural = 'tentativa restante';
        if (gameconfig.tries > 2) tryplural = 'tentativas restantes';

        if (dist <= 9) color = '#26ff00';
        else if (dist >= 10) color = '#aaff00';
        else if (dist >= 20) color = '#e1ff00';
        else if (dist >= 50) color = '#ffe500';
        else if (dist >= 100) color = '#ffaa00';
        else if (dist >= 200) color = '#ff5900';
        else if (dist >= 300) color = '#ff0000';

        if (parseInt(u_msg.content) < random_number) {
            gameconfig.trycount++;
            gameconfig.tries--;
            return message.channel.send(new Discord.RichEmbed()
                .setTitle(`**${u_msg.content}** é **menor** que o numero secreto, tente novamente.`)
                .setDescription(`${gameconfig.tries} ${tryplural}.`)
                .setColor(color))
        }

        if (parseInt(u_msg.content) > random_number) {
            gameconfig.trycount++;
            gameconfig.tries--;
            return message.channel.send(new Discord.RichEmbed()
                .setTitle(`**${u_msg.content}** é **maior** que o numero secreto, tente novamente.`)
                .setDescription(`${gameconfig.tries} ${tryplural}.`)
                .setColor(color))
        }
    })

    game_collector.on('end', (msg, reason) => {
        serversmap.delete(message.guild.id);
        bot_collector.collected.deleteAll();
        bot_collector.stop();
        switch (reason) {
            case 'gameover':
                return message.channel.send(new Discord.RichEmbed()
                    .setTitle('Game Over!')
                    .setDescription(`Você perdeu todas as suas tentativas.
                    O número secreto era **${random_number}**.`)
                    .setColor('#FF0000'));
            case 'forced':
                return message.channel.send(new Discord.RichEmbed()
                    .setTitle('Game Over!')
                    .setDescription(`Jogo terminado pelo usuário.
                    O número secreto era **${random_number}**.`)
                    .setColor('#FF0000'));
            case 'win':
                return message.channel.send(new Discord.RichEmbed()
                    .setTitle('Vitória')
                    .setDescription('Parabéns, você acertou o numero secreto!')
                    .addField('Estatísticas',
                        `**Número secreto:** ${random_number}
                    **Números tentados:** ${gameconfig.trycount + 1}
                    **Tentativas restantes:** ${gameconfig.tries - 1}
                    **Título:** ${gameconfig.title}`)
                    .setColor('#00FF00'));
            default:
                return message.channel.send(new Discord.RichEmbed()
                    .setTitle('Game Over!')
                    .setDescription(`O jogo excedeu o limite de tempo de 5 minutos.
                    O número secreto era **${random_number}**.`)
                    .setColor('#FF0000'));
        }
    })

}

module.exports.help = {
    name: 'guess',
    descr: 'Jogo de adivinhação de números.'
}