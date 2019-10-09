const config = require('../config');

let greetingChannel;

module.exports = [
    {
        name: "ready",
        run: (client) => {
            greetingChannel = client.channels.get(config.channel.greeting);
        }
    }, {
        name: 'guildMemberAdd',
        run: (client, member) => {
            if (greetingChannel) {
                greetingChannel.send(`${member.user} entrou no servidor!`);
            }
        }
    }, {
        name: 'guildMemberRemove',
        run: (client, member) => {
            if (greetingChannel) {
                greetingChannel.send(`${member.user} saiu do servidor!`);
            }
        }
    }
];
