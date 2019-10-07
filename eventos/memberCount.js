exports.name = 'ready';
exports.run = (client) => {
    let gameloop = require(`./gameLoop.js`);
    gameloop.run(client);

    const Discord = require("discord.js")
    console.log('log', `O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`)
}

module.exports = [
    {
        name: 'guildMemberAdd',
        run: member => {
            var numbertowords = require('number-to-words');
            var membersCount = `${client.guilds.get('622160862605737990').memberCount}`;
            var membersArray = new Array();
            var membersSplit = membersCount.split("");
            var counter = "";
        
            for (var i = 0; i < membersCount.length; i++) {
                membersArray[i] = numbertowords.toWords(membersSplit[i]);
                counter += ':' + membersArray[i] + ': ';
            }
        
            const channel = client.channels.get('622160862605737992');
            channel.setTopic(`Temos atualmente ${counter} membros`)
        }
    }, {
        name: 'guildMemberRemove',
        run: member => {
            var numbertowords = require('number-to-words');
            var membersCount = `${client.guilds.get('622160862605737990').memberCount}`;
            var membersArray = new Array();
            var membersSplit = membersCount.split("");
            var counter = "";
        
            for (var i = 0; i < membersCount.length; i++) {
                membersArray[i] = numbertowords.toWords(membersSplit[i]);
                counter += ':' + membersArray[i] + ': ';
            }
        
            const channel = client.channels.get('622160862605737992');
            channel.setTopic(`Temos atualmente ${counter} membros`)
        }
    }
];
