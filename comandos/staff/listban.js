const Discord = require('discord.js');

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))
    try {
        let output = '';
        let i = 0;

        message.channel.send(`Você quer receber a lista de bans? Reaja com ✅ para confirmar o envio. `)
            .then(async (msg) => {
                await msg.react("✅")
                await msg.react("⏹")
                const filter = (reaction, user) => ['✅', '⏹'].includes(reaction.emoji.name) && user.id === message.author.id
                const collector = msg.createReactionCollector(filter)
                collector.on("collect", r => {

                    switch (r.emoji.name) {
                        case '✅':

                            msg.reactions.map(re => re.remove(client.user))
                            message.guild.fetchBans().then(async (bans) => {
                                message.channel.send('Enviei a lista de bans no seu privado!');

                                bans.forEach(async (ban) => {
                                    i++;
                                    await message.author.send(i + '. **Nome:** ' + ban.tag + ' | **ID:** ' + ban.id + '');
                                });

                            });
                            break;
                        case '⏹':
                            msg.reactions.map(re => re.remove(client.user))
                            msg.delete().then(message.channel.send(`O envio foi cancelado.`));
                            break;
                    }
                })
            })


    } catch (err) {
        message.channel.send('Um erro aconteceu!\n' + err).catch();
    }
};


exports.help = {
    name: 'listbans'
};