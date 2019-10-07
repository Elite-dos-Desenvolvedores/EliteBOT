const Discord = require("discord.js");
const config = require("./comandos/config.js")

/* Event handlers */

/** Caches messages upon connection to discord */
function onReady() {
    /** @type {Guild} */
    let guild = null;
    /** @type {TextChannel|VoiceChannel} */
    let channel = null;

    for (guild of client.guilds.values())
        for (channel of guild.channels.values()) {
            const channelName = channel.name;

            // Skip non-text channels
            if (!channel.fetchMessages) continue;

            // Max limit is 100 messages...
            channel.fetchMessages({
                    limit: 100
                })
                .then(messages => {
                    console.log(`Recebendo ${messages.size} mensagens de #${channelName}`)
                })
                .catch(console.error);
        }
}

/**
 * Handles reactions added to (almost) any message in channels
 *
 * @param {MessageReaction} react
 * @param {User} user
 */
function onReaction(react, user) {
    const message = react.message;
    const channel = message.channel;
    const guild = message.guild;

    // Ignore if this happened in the target channel
    if (channel.name.toLowerCase() === config.highlightChannel.toLowerCase())
        return;

    // Ignore if it's not the superpin emoji
    if (react.emoji.name.toLowerCase() !== config.highlightEmoji.toLowerCase())
        return;

    // Finally, go ahead and pin it to the channel
    pinMessage(guild, message, user);
}

/**
 * Handles the pinning of a message to the pin channel
 *
 * @param {Guild} guild
 * @param {Message} message
 * @param {User} user
 */
function pinMessage(guild, message, user) {
    /** @type {TextChannel|VoiceChannel} */
    let channel = null;
    let found = false;

    // Search for target channel
    for (channel of guild.channels.values()) {
        if (channel.name.toLowerCase() !== config.highlightChannel)
            continue;

        // Skip non-text channels
        if (!channel.send) {
            console.error(`Found channel "${highlightChannel.name}", but it's not a text one!`);
            continue;
        }

        found = true;
        break;
    }

    // Balk if target channel not found
    if (!found) {
        console.error(`Can't pin message; can't find channel #${config.highlightChannel}`);
        return;
    }

    // Finally, prepared the pinned message and pin it!
    let pinMessage = [
        `${user} destacado por ${message.author}:`,
        `---`,
        `<**${message.createdAt.toLocaleString()}**> ${message.content}`
    ];

    channel.send(pinMessage)
        .then(_ => console.log(`Destaque de ${user.tag}: "${message.content}"`))
        .catch(console.error);
}