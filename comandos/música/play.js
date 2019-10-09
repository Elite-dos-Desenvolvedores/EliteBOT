const Discord = require('discord.js');
const fs = require("fs");
const moment = require("moment");
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube('AIzaSyAntMu3piyFukdVknRsh5kO09dr1pr5hJw');
const opus = require("opusscript");
const gyp = require("node-gyp");

exports.run = async (client, message, args, queue) => {
  message.delete()

  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  if (!searchString) return message.reply("insira a musica que você quer pesquisar.").then(msg => msg.delete(8000))
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send(`${message.author}, me desculpe, mas você precisa estar em um canal de voz para tocar música`).then(msg => msg.delete(8000));
  const permissions = voiceChannel.permissionsFor(client.user);
  if (!permissions.has('CONNECT')) {
    return message.channel.send(`${message.author}, não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!`).then(msg => msg.delete(8000));
  }
  if (!permissions.has('SPEAK')) {
    return message.channel.send(`${message.author}, não posso falar neste canal de voz, verifique se eu tenho as permissões adequadas!`).then(msg => msg.delete(8000));
  }

  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await youtube.getPlaylist(url);
    const videos = await playlist.getVideos();
    for (const video of Object.values(videos)) {
      const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
      await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
    }
    queue.push({
      link: args.join(' '),
      author: message.author.tag
    });

    return message.channel.send(`🎶 A playlist \`${playlist.title}\` foi adicionada na fila de músicas!`).then(msg => msg.delete(8000));
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        message.channel.send(`Procurando informações para: \`${searchString}\`...`).then(msg => msg.delete(5000))
        var videos = await youtube.searchVideos(searchString, 5);
        let index = 0;


        const embed = new Discord.RichEmbed()
          .setDescription(videos.map(video2 => `**${++index} -** ${video2.title} `).join('\n'))
          .setAuthor("Selecione sua música: ", 'https://i.imgur.com/3mwi1hl.png')
          .setColor('RANDOM')
          .setFooter("Para escutar a música desejada, selecione a musica de 1 à 5.", message.author.avatarURL)
        let msgtoDelete = await message.channel.send({
          embed: embed
        });
        // eslint-disable-next-line max-depth
        try {
          var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
            maxMatches: 1,
            time: 10000,
            errors: ['time']
          });
          msgtoDelete.delete();
        } catch (err) {
          console.error(err);
          const noPick = new Discord.RichEmbed()
            .setDescription("Não foi escolhida nenhuma música desejada, cancelando o selecionamento!")
            .setFooter(message.author.tag, 'https://cdn.discordapp.com/emojis/465209209420775445.png?v=1')
            .setColor('RANDOM')
            .setTimestamp()
          message.channel.send({
            embed: noPick
          }).then(msg => msg.delete(8000));
          msgtoDelete.delete()
          return;
        }
        const videoIndex = parseInt(response.first().content);
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
      } catch (err) {
        console.error(err);
        return message.channel.send(`${message.author}, hey! Não obtive nenhum resultado da sua pesquisa! `).then(msg => msg.delete(8000));
      }
    }
    return handleVideo(video, message, voiceChannel);
  }

  // Time for the functions

  async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    //   console.log(video);
    const song = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      author: message.author.tag,
      creator: video.raw.snippet.channelTitle,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        skippers: [],
        songs: [],
        volume: 100,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`I could not join the voice channel: ${error}`);
      }
    } else {
      serverQueue.songs.push(song);
      // console.log(serverQueue.songs);
      if (playlist) return undefined;
      else return message.channel.send(`🎶 \`${song.title}\` foi adicionada na fila de músicas!`);
    }
    return undefined;
  }

  function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    //   console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(yt(song.url))
      .on('end', reason => {
        if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
        else console.log("Erro " + reason);
        serverQueue.songs.shift();
        setTimeout(() => {
          play(guild, serverQueue.songs[0]);
        }, 250);
      })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    //Modified playing messages that give you the song duration!

    let durations = song.durations - 1
    var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
    var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
    if (song.durationh !== 0) {
      if (secondslength == 1 || secondslength == 0) {
        if (mlength == 1 || mlength == 0) {
          const embed1 = new Discord.RichEmbed()
            .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})
	▫ Música postada por: **${song.creator}**
▫ Duração: **${song.durationh}:0${song.durationm}:0${durations}**`)
            .setFooter("© EdD", client.user.avatarURL)
            .setThumbnail('https://i.imgur.com/3mwi1hl.png')
            .setColor('RANDOM')
          return serverQueue.textChannel.send(embed1);
        }
      }
    }
    if (song.durationh !== 0) {
      if (secondslength == 1 || secondslength == 0) {
        if (mlength !== 1 || mlength !== 0) {
          const embed2 = new Discord.RichEmbed()
            .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})     
▫ Música postada por: **${song.creator}**
▫ Duração: **${song.durationh}:${song.durationm}:0${durations}**`)
            .setFooter("© EdD", client.user.avatarURL)
            .setThumbnail('https://i.imgur.com/3mwi1hl.png')
            .setColor('RANDOM')

          return serverQueue.textChannel.send(embed2);
        }
      }
    };
    if (song.durationh !== 0) {
      if (mlength == 1 || mlength == 0) {
        if (secondslength !== 1 || secondslength !== 0) {
          const embed3 = new Discord.RichEmbed()
            .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})
▫ Música postada por: **${song.creator}**
▫ Duração: **${song.durationh}:0${song.durationm}:${durations}**`)
            .setFooter("© EdD", client.user.avatarURL)
            .setThumbnail('https://i.imgur.com/3mwi1hl.png')
            .setColor('RANDOM')

          return serverQueue.textChannel.send(embed3);
        }
      }
    }
    if (song.durationh !== 0) {
      if (mlength !== 1 || mlength !== 0) {
        if (secondslength !== 1 || secondslength !== 0) {
          const embed4 = new Discord.RichEmbed()
            .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})     
▫ Música postada por: **${song.creator}**
▫ Duração: **${song.durationh}:${song.durationm}:${durations}**`)
            .setFooter("© EdD", client.user.avatarURL)
            .setThumbnail('https://i.imgur.com/3mwi1hl.png')
            .setColor('RANDOM')

          return serverQueue.textChannel.send(embed4);
        }
      }
    }
    if (song.durationh == 0 && song.durationm !== 0) {
      if (secondslength == 1 || secondslength == 0) {
        const embed5 = new Discord.RichEmbed()
          .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})   
▫ Música postada por: **${song.creator}**
▫ Duração: **${song.durationm}:0${durations}**`)
          .setFooter("© EdD", client.user.avatarURL)
          .setThumbnail('https://i.imgur.com/3mwi1hl.png')
          .setColor('RANDOM')

        return serverQueue.textChannel.send(embed5);
      }
    }
    if (song.durationh == 0 && song.durationm !== 0) {
      if (secondslength !== 1 || secondslength !== 0) {
        const embed6 = new Discord.RichEmbed()

          .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})      
▫ Música postada por: **${song.creator}**
▫ Duração: **${song.durationm}:${durations}**`)
          .setFooter("© EdD", client.user.avatarURL)
          .setThumbnail('https://i.imgur.com/3mwi1hl.png')
          .setColor('RANDOM')
        return serverQueue.textChannel.send(embed6);
      }
    }
    if (song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {

      const embed7 = new Discord.RichEmbed()
        .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})
▫ Música postada por: **${song.creator}**
▫ Duração: **0:${durations}**`)
        .setFooter("© EdD", client.user.avatarURL)
        .setThumbnail('https://i.imgur.com/3mwi1hl.png')
        .setColor('RANDOM')

      return serverQueue.textChannel.send(embed7);
    } else {
      const embed8 = new Discord.RichEmbed()
        .addField("Informações da musica:", `▫ Música: [${song.title}](${song.url})
▫ Música postada por: **${song.creator}**`)
        .setFooter("© EdD", client.user.avatarURL)
        .setThumbnail('https://i.imgur.com/3mwi1hl.png')
        .setColor('RANDOM')

      return serverQueue.textChannel.send(embed8);
    }
  }
}

exports.help = {
  name: "tocar",
  aliases: ['play']
}