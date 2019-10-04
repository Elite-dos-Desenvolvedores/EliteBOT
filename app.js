const Discord = require('discord.js'); //definindo conexão com discord padrão
const config = require('./comandos/config.json'); //Recuperando dados do arquivo de configuração
const fs = require('fs'); //Definindo constante fs para inicialização de eventos
const client = new Discord.Client(); //definindo o bot como um novo client
client.Database = require('./database.js')
const c = require('colors')
const cooldown = new Set()

client.Discord = require('discord.js')
console.log(c.black('Carregando...'))
client.c = require('./comandos/config.json')

const queue = new Map();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

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

loadCommands('./comandos');

client.on('guildMemberAdd', member => {

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
});

client.on('guildMemberRemove', member => {

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
});



client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.isMentioned(client.user)) {
        message.reply('meu prefixo neste servidor é `!`, para ver o que eu posso fazer use `!ajuda` em <#622169842530910218>!');
    }


    if (!message.content.startsWith(config.prefix)) return;

    var messageArray = message.content.split(" ");
    var cmd = messageArray[0].toLowerCase();
    var args = messageArray.slice(1);
    if (message.channel.id !== '622169842530910218' && cmd !== "!limpar" && cmd !== "!embed" && cmd !== "!chat" && cmd !== "!slowmode" && cmd !== "!langs" && cmd !== "!spacemychannel") return message.reply("utilize o canal <#622169842530910218> para executar um comando!").then(msg => msg.delete(5000))

    if (cooldown.has(message.author.id)) {
        message.delete()
        return message.reply("aguarde 5 segundos para executar um novo comando.").then(msg => msg.delete(5000))
    }


    if (!message.member.roles.find(role => role.name === "Administrador") || !message.member.roles.find(role => role.name === "Moderador")) {
        cooldown.add(message.author.id)
    }

    try {
        var command = client.commands.get(cmd.slice(config.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(config.prefix.length)))
        if (command) command.run(client, message, args, queue)
    } catch (err) {
        console.error("Erro: " + err);
    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, 5000)
})


client.on("ready", () => {
    console.log('\n')
    console.log(c.bold('[CONECTADO] ') + c.green('A aplicação foi conectada e estabelecida com sucesso!'))
})



fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("ERRO: " + err)

    files.forEach(file => {

        var eventFunction = require(`./eventos/${file}`)
        var eventName = file.split(".")[0];
        console.log(`[EVENTO] ${file}` + c.yellow(' Carregado!'))

        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    })
})

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
        if(!Array.isArray(event)) {
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

loadListeners('./eventos/');

client.login(config.token);