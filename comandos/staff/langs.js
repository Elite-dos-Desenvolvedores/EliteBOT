const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Você não pode fazer isto :c')

    await message.delete().catch(O_o => {});

    const a = message.guild.roles.get('622941407509741589'); // C
    const b = message.guild.roles.get('622941463487053835'); // Java
    const c = message.guild.roles.get('622941569384972308'); // Javascript

    const embed = new RichEmbed()
        .setTitle('Tags disponiveis')
        .setDescription(`
        Reaja abaixo para receber uma tag: 

       🇦 ${a.toString()}
       🇧 ${b.toString()}
       🇨 ${c.toString()}
       `)
        .setColor(0xdd9323)
        .setTimestamp();

    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');
    });
};

exports.help = {
    name: 'welcomeroles'
};