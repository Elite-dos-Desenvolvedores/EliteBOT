const Discord = require('discord.js');

const items = [{
        question: 'Quais foram os criadores do grupo?',
        answer: ['Sasuke', 'Jaum', 'Vitagliano'],
    },
    {
        question: 'Qual o nome do principal bot do grupo?',
        answer: ['Segurança'],
    },
    {
        question: 'Quando o Elite dos Desenvolvedores foi criado?',
        answer: ['13 de Setembro de 2019'],
    },
    {
        question: 'Qual o jogo mais jogado pela galera do grupo? ',
        answer: ['Krunker'],
    },
];

const config = {
    max: 1,
    time: 60000,
    errors: ['time'],
};

const random = items[Math.floor(Math.random() * items.length)];

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Você não tem permissão para usar este comando`);

    let tempo = 0;

    const addTime = setInterval(() => {
        tempo += 1;
    }, 1000);

    // Manda o tempo do jogo, a cada 30 seg
    const sendTime = setInterval(() => {
        message.channel.send(
            `⌚ O jogo está rolando! Já se passaram ${tempo + 1} segundos`
        );
    }, 30000);

    const question = new Discord.RichEmbed()
        .setTitle(`Evento QUIZ\n**${random.question}**`)
        .setDescription(
            'Lembre-se que todas as respostas estão em português e somente será válida a que estiver escrita corretamente.'
        )
        .setColor('RANDOM');

    message.channel.send('Irá começar em :three: segundos...');
    setTimeout(() => {
        message.channel.send('Irá começar em :two: segundos...');
    }, 1000);
    setTimeout(() => {
        message.channel.send('Irá começar em :one: segundos...');
    }, 2000);
    setTimeout(() => {
        message.channel.send(question);
    }, 3000);

    try {
        const collector = await message.channel.awaitMessages(
            answer => random.answer.includes(answer.content.toLowerCase()),
            config
        );
        const winnerAnswer = collector.first();
        winnerAnswer.delete();

        const win = new Discord.RichEmbed()
            .setTitle(
                `Evento QUIZ\n**${
						winnerAnswer.author.username
					} acertou.**`
            )
            .setDescription(
                `**Informações:**\n Ganhador: ${
						winnerAnswer.author.username
					}\n Pergunta: \`\`${
						random.question
					}\`\`\n Premiação: \`\`xxx\`\`.` +
                `\n Tempo de jogo: \`\`${tempo} segundos\`\`.`
            )
            .setColor('RANDOM');

        message.channel.send(win);
        client.channels.get().send(win);
        clearInterval(addTime);
        return clearInterval(sendTime);
    } catch (e) {
        console.log('enviou porra', e);
        // if(e.message == 'time') {
        const timeout = new Discord.RichEmbed()
            .setTitle(
                'Evento QUIZ\n**' +
                'Quiz finalizado pois não houve acertos.' +
                '**'
            )
            .setDescription(
                `${'**Informações:**\n Ganhador: ' +
						'Ninguém' +
						'\n Pergunta: ``'}${
						random.question
					}\`\`\n Premiação: \`\`xxx\`\`.` +
                `\n Tempo de jogo: \`\`${tempo} segundos\`\`.`
            )
            .setColor('RANDOM');
        message.channel.send(timeout);
        clearInterval(addTime);
        return clearInterval(sendTime);
        // }
    }
}


exports.help = {
    name: 'quiz'
}