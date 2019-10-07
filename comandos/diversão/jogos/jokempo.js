exports.run = async (client, message, args) => {
    const rng = Math.floor((Math.random() * 100) + 1);

    if (args[0] === 'pedra' && rng > 0 && rng <= 34) {
        return message.channel.send('Pedra, empatamos :)');
    } else if (args[0] === 'pedra' && rng > 34 && rng <= 67) {
        return message.channel.send('Papel, você perdeu! ');
    } else if (args[0] === 'pedra' && rng > 67 && rng <= 100) {
        return message.channel.send('Tesoura, eu perdi :(');
    } else if (args[0] === 'papel' && rng > 0 && rng <= 34) {
        return message.channel.send('Papel, empatamos :)');
    } else if (args[0] === 'papel' && rng > 34 && rng <= 67) {
        return message.channel.send('Tesoura, você perdeu!');
    } else if (args[0] === 'papel' && rng > 67 && rng <= 100) {
        return message.channel.send('Pedra, eu perdi :(');
    } else if (args[0] === 'tesoura' && rng > 0 && rng <= 34) {
        return message.channel.send('Tesoura, empatamos :)');
    } else if (args[0] === 'tesoura' && rng > 34 && rng <= 67) {
        return message.channel.send('Pedra, você perdeu!');
    } else if (args[0] === 'tesoura' && rng > 67 && rng <= 100) {
        return message.channel.send('Papel, eu perdi :(');
    }

    if (args[0] !== 'pedra' || args[0] !== 'papel' || args[0] !== 'tesoura') {
        return message.reply('Por favor, insira `pedra`, `papel` ou `tesoura`.');
    }

}
exports.help = {
    name: "jokempo"
}