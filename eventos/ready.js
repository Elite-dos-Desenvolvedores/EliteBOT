exports.name = 'ready';
exports.run = (client) => {
    let gameloop = require(`./gameLoop.js`);
    gameloop.run(client);

    const Discord = require("discord.js")
    console.log('log', `O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`)
}