const config = require('../config');

const greetingChannel = client.channels.get(config.channel.greeting);

module.exports = [
    {
        name: 'guildMemberAdd',
        run: (client, member) => {
            greetingChannel.send(`${member.user} entrou no servidor!`);
        }
    }, {
        name: 'guildMemberRemove',
        run: (client, member) => {
            greetingChannel.send(`${member.user} saiu do servidor!`);
        }
    }
];
