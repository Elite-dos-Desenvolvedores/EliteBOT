const gameLoop = require('../utils/gameLoop');

exports.name = 'ready';
exports.run = (client) => {
    gameLoop.run(client);

    console.log(`O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`);
};
