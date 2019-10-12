const request = require('request');
const {
    JSDOM
} = require('jsdom');
const {
    stripIndents
} = require('common-tags');
let serversmap = new Map(); // List all the servers that the game is running

exports.run = async (client, message, args) => {
    if (serversmap.has(message.guild.id)) {
        return message.channel.send(new Discord.RichEmbed()
            .setTitle('Erro')
            .setDescription('Já existe uma instância do jogo rodando neste servidor.')
            .setColor("RANDOM"));
    }
    try {

        request('https://www.palabrasaleatorias.com/palavras-aleatorias.php/', async(err, res) => {
            if (err) return console.log(err);
            const dom = new JSDOM(res.body);
            const pageWord = dom.window.document.querySelector("table div").innerHTML;
            const word = pageWord.toLowerCase().replace(/ /g, '-');
            console.log(word)
            let points = 0;
            let displayText = null;
            let guessed = false;
            const confirmation = [];
            const incorrect = [];
            const display = new Array(word.length).fill('_');
            console.log(display)
            while (word.length !== confirmation.length && points < 6) {
                await message.channel.send(stripIndents `
                        ${displayText === null ? 'Lá vamos nós!' : displayText ? 'Bom trabalho!' : 'Nope!'}
                        \`${display.join(' ')}\`. Qual letra você escolhe?
                        Tentativas incorretas: ${incorrect.join(', ') || 'Nenhuma'}
                        \`\`\`
                        ___________
                        |     |
                        |     ${points > 0 ? 'O' : ''}
                        |    ${points > 2 ? '—' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '—' : ''}
                        |    ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
                        |
                        ============
                        \`\`\`
                    `);
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000
                });
                if (!guess.size) {
                    await message.reply('Aah que pena, o tempo acabou!');
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && (choice === word || choice === body.word.toLowerCase())) {
                    guessed = true;
                    break;
                } else if (word.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] !== choice) continue; // eslint-disable-line max-depth
                        confirmation.push(word[i]);
                        display[i] = word[i];
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) incorrect.push(choice);
                    points++;
                }
            }
            message.delete(message.channel.id);
            if (word.length === confirmation.length || guessed) return message.reply(`você venceu, a palavra era ${word}!`);
            return message.reply(`que pena, a palavra era ${word}...`);
    });
    } catch (err) {
        message.delete(message.channel.id);
        return message.reply(`erro: \`${err.message}\`. Tente novamente mais tarde!`);
    }
}

exports.help = {
    name: "forca",
    aliases: ['hangman']
}