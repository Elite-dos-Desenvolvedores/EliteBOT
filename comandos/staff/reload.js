const prefix = require('../config.json');
exports.run = (client, message, args) => {
    if (!args || args.size < 1) return message.channel.send('', {
        embed: {
            title: 'Nenhum comando para reiniciar!',
            color: 0x008AF3,
            description: `Especifique o comando a ser reinicializado (**${prefix}reload** <comando>)`,
            footer: {
                text: 'EdD',
                icon_url: client.user.avatarURL
            }
        }
    });
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.channel.send('', {
        embed: {
            author: {
                name: client.user.username
            },
            title: 'Comando reiniciado!',
            description: `O comando **${args[0]}** foi reinicializado com sucesso!`,
            color: 0x008AF3,
            footer: {
                text: 'EdD',
                icon_url: client.user.avatarURL
            }
        }
    });
};

exports.help = {
    name: 'reload',
    description: 'Reinicia um comando.',
    usage: 'reload <comando>'
};