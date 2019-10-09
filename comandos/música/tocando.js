const Discord = require("discord.js");

const fs = require("fs");
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAntMu3piyFukdVknRsh5kO09dr1pr5hJw');
const opus = require("opusscript");
const gyp = require("node-gyp");

exports.run = async (client, message, args, queue) => {


  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);

  if (!serverQueue) return message.channel.send("não há nada tocando.");
  let embed = new Discord.RichEmbed()
    .addField("Informações sobre a música atual: ", `▫ Música: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})
    ▫ Música postada por: **${serverQueue.songs[0].creator}**
    ▫ Duração: **${serverQueue.songs[0].durationh}:0${serverQueue.songs[0].durationm}:0${serverQueue.songs[0].durations}**`)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setThumbnail('https://i.imgur.com/3mwi1hl.png')
    .setColor('RANDOM')

  // .setDescription(`:notes: Currently Playing: **${serverQueue.songs[0].title}**`);
  message.channel.send(embed);

  // Time for the functions

  async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    //   console.log(video);
    const song = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumb: video.thumbnail.maxres.url,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds

    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        skippers: [],
        songs: [],
        volume: 5,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Eu não pude entrar no canal de voz: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
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
        else console.log("NP " + reason);
        serverQueue.songs.shift();
        setTimeout(() => {
          play(guild, serverQueue.songs[0]);
        }, 250);
      })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`🎶 Começa a tocar: **${song.title}**`);
  }
}


exports.help = {
  name: "tocando",
  aliases: ['playing']
}