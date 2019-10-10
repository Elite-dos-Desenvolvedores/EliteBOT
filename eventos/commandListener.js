const Discord = require('discord.js');
const config = require('../config');

const cooldown = new Map();
const queue = new Map();

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */
async function onMessage(client, message) {
    if (message.author.bot || message.channel.type !== "text") {
        return;
    }

    if (message.isMentioned(client.user)) {
        message.reply('o meu prefixo neste servidor é `!`, para ver o que eu posso fazer use `!ajuda` em <#' + config.channel.commands + '>!');
    }

    if (!message.content.startsWith(config.prefix)) {
        return;
    }
    
    const args = message.content.split(' ');
    const cmd = args.shift();

    if(message.channel.id !== config.channel.commands) {
        if(cmd !== "!limpar" && cmd !== "!embed" && cmd !== "!chat" && cmd !== "!slowmode" && cmd !== "!langs" && cmd !== "!spacemychannel") {
            message
                .reply(`utilize o canal <#${config.channel.commands}> para executar um comando!`)
                .then(msg => msg.delete(5000));
            return;
        }
    }

    const command = getCommand(client, cmd);
    if (command) {
        message.delete(1000).catch(err => {});

        if (cooldown.has(message.author.id)) {
            const timeSinceLastCommand = Date.now() - cooldown.get(message.author.id);
            if (timeSinceLastCommand < config.command.cooldown) {
                message
                    .reply(`Aguarde ${((config.command.cooldown - timeSinceLastCommand) / 1000).toFixed(2)} segundos para executar um novo comando.`)
                    .then(msg => msg.delete(5000));
                return;
            }
        }

        if (!message.member.roles.find(role => role.name === "Administrador" || role.name === "Moderador")) {
            cooldown.set(message.author.id, Date.now());
        }

        command.run(client, message, args, queue);
    }
}

function getCommand(client, name) {
    name = name.slice(config.prefix.length);
    
    let command = client.commands.get(name);
    if (!command) {
        command = client.commands.get(client.aliases.get(name));
    }

    return command;
}

module.exports = {
    name: 'message',
    run: onMessage
};
