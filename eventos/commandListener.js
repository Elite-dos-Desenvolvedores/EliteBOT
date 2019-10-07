const cooldown = new Set()
const queue = new Map();

exports.name = 'message';
exports.run = async (client, message) => {
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
}