const {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Você não pode fazer isto :c')

    await message.delete().catch(O_o => {});

    const a = message.guild.roles.get('622941407509741589'); // C
    const b = message.guild.roles.get('622941463487053835'); // Java
    const c = message.guild.roles.get('622941569384972308'); // Javascript
    const d = message.guild.roles.get('622941592759566337'); // Kotlin
    const e = message.guild.roles.get('622941618445615117'); // PHP
    const f = message.guild.roles.get('622941651257655308'); // GO
    const g = message.guild.roles.get('622941668521410581'); // HTML
    const h = message.guild.roles.get('622941753875628053'); // CSS
    const i = message.guild.roles.get('627547764708081665'); // Rust
    const j = message.guild.roles.get('627548272885760021'); // C++
    const k = message.guild.roles.get('627548355173548042'); // C#

    const filter = (reaction, user) => ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new RichEmbed()
        .setTitle('Tags disponiveis')
        .setDescription(`
        Reaja abaixo para receber uma tag: 

        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        🇩 ${d.toString()}
        🇪 ${e.toString()}
        🇫 ${f.toString()}
        🇬 ${g.toString()}
        🇭 ${h.toString()}
        🇮 ${i.toString()}
        🇯 ${j.toString()}
        🇰 ${k.toString()}
       `)
        .setColor('RANDOM')
        .setTimestamp();
        🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿
    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');
        await msg.react('🇩');
        await msg.react('🇪');
        await msg.react('🇫');
        await msg.react('🇬');
        await msg.react('🇭');
        await msg.react('🇮');
        await msg.react('🇯');
        await msg.react('🇰');

        msg.awaitReactions(filter, {
            max: 10,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '😀':
                    if (message.member.roles.has(a.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(a).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${a.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😁':
                    if (message.member.roles.has(b.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(b).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${b.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😂':
                    if (message.member.roles.has(c.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(c).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${c.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '🤣':
                    if (message.member.roles.has(d.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(d).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${d.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😃':
                    if (message.member.roles.has(e.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(e).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${e.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😄':
                    if (message.member.roles.has(f.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(f).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${f.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😅':
                    if (message.member.roles.has(g.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(g).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${g.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😆':
                    if (message.member.roles.has(h.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(h).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${h.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😉':
                    if (message.member.roles.has(i.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(i).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${i.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😊':
                    if (message.member.roles.has(j.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(j).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${j.name}**!`).then(m => m.delete(3000));
                    
                    return;
                case '😋':
                    if (message.member.roles.has(k.id)) {
                        
                        return message.channel.send('Você já tem essa tag!').then(m => m.delete(3000));
                    }
                    message.member.addRole(k).catch(err => {
                        console.log(err);
                        return message.channel.send(`Erro ao te adicionar a tag: **${err.message}**.`);
                    });
                    message.channel.send(`Você recebeu a tag: **${k.name}**!`).then(m => m.delete(3000));
                    
                    return;

            }
        }).catch(collected => {
            return message.channel.send(`Não consegui adicionar essa tag para você!`);
        });

    });

};

exports.help = {
    name: 'welcomeroles'
};