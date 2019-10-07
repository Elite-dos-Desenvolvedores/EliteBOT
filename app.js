const Discord = require('discord.js'); //definindo conexão com discord padrão
const fs = require('fs'); //Definindo constante fs para inicialização de eventos
const client = new Discord.Client(); //definindo o bot como um novo client
const c = require('colors');

client.Database = require('./database.js');
client.Discord = require('discord.js');
client.c = require('./comandos/config.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

/**
 * Initialize and start the bot.
 */
function start() {
    console.log(c.cyan('Carregando eventos...'));
    loadEvents('./eventos');

    console.log(c.cyan('Carregando comandos...'));
    loadCommands('./comandos');

    console.log(c.cyan('Conectando o bot...'));
    client.login(client.c.token);
}

/**
 * Load all commands in a specific directory.
 * 
 * @param {string} dir - The commands directory.
 */
function loadCommands(dir) {
    const dirList = dir.split('/');
    dirList.shift();
    dirList.shift();
    const commandCategory = dirList
        .join('/');

    let files = fs.readdirSync(dir);
    const commands = [];

    for (const file of files) {
        if(file.split('.').length === 1) {
            // It's a directory, try to read commands there.
            loadCommands(`${dir}/${file}`);
            continue;
        }

        let cmd = require(`${dir}/${file}`);
        if(!cmd.help) {
            // Invalid command.
            continue;
        }

        commands.push(file.split('.').shift());

        client.commands.set(cmd.help.name, cmd);
        if(cmd.help.aliases) {
            cmd.help.aliases
            .filter(alias => alias.trim() !== '')
            .forEach(alias => client.aliases.set(alias, cmd.help.name));
        }
    }

    if(commands.length > 0) {
        console.log(`[COMANDO] ` + c.yellow('Foram carregados ') + commands.length + c.yellow(' comandos na categoria ') + commandCategory + c.yellow('. [') + commands.join(c.yellow(', ')) + c.yellow(']'));
    }
}

/**
 * Load all events in a specific directory.
 * 
 * @param {string} dir - The events directory.
 */
function loadEvents(dir) {
    let files = fs.readdirSync(dir);

    for (const file of files) {
        if(file.split('.').length === 1) {
            // It's a directory, try to read events there.
            loadEvents(`${dir}/${file}`);
            continue;
        }

        let events = require(`${dir}/${file}`);
        if(!Array.isArray(events)) {
            events = [events];
        }

        for (const event of events) {
            if(!event.name || !event.run) {
                continue;
            }

            console.log(`[EVENTO] ` + c.yellow('O evento ') + event.name + c.yellow(' foi carregado!'));

            client.on(event.name, (...args) => event.run(client, ...args));
        }
    }
}

start();
