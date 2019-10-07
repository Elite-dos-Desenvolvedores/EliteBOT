const Discord = require('discord.js'); //definindo conexão com discord padrão
const config = require('./comandos/config.json'); //Recuperando dados do arquivo de configuração
const fs = require('fs'); //Definindo constante fs para inicialização de eventos
const client = new Discord.Client(); //definindo o bot como um novo client
client.Database = require('./database.js');
const c = require('colors');

client.Discord = require('discord.js');
console.log(c.black('Carregando...'));
client.c = require('./comandos/config.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function start() {
    loadEvents('./eventos/');

    loadCommands('./comandos');

    client.login(config.token);
}

/**
 * Load all commands in a specific directory.
 * 
 * @param {string} dir - The commands directory.
 */
function loadCommands(dir) {
    let files = fs.readdirSync(dir);

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

        const dirList = dir.split('/');
        dirList.shift();
        dirList.shift();
        const commandCategory = dirList
            .join('/');
        console.log(c.bold(`[${commandCategory.toUpperCase()}] `) + c.inverse(`${file}`) + c.yellow(' Carregado!'));

        client.commands.set(cmd.help.name, cmd);
        if(cmd.help.aliases) {
            cmd.help.aliases
            .filter(alias => alias.trim() !== '')
            .forEach(alias => client.aliases.set(alias, cmd.help.name));
        }
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
            events = [events]
        }

        for (const event of events) {
            if(!event.name || !event.run) {
                continue;
            }

            console.log(`[EVENTO] ${event.name}` + c.yellow(' Carregado!'));

            client.on(event.name, (...args) => event.run(client, ...args));
        }
    }
}