const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const opus = require("opusscript");
const youtube = new YouTube('AIzaSyAntMu3piyFukdVknRsh5kO09dr1pr5hJw');
const gyp = require("node-gyp");

exports.run = async (client, message, args, queue) => {


  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);

  if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
  if (!serverQueue) return message.channel.send("Não há nada para eu parar por você");
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('O comando Stop foi usado!');
  message.channel.send(`🎶 Música foi parada!`);
  return undefined;

  // Time for the functions

  async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    //   console.log(video);
    const song = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`
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
        if (reason === 'Stream is not generating quickly enough.') console.log('Música finalizada.');
        else console.log("STOP " + reason);
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
  name: "parar",
  aliases: ['stop']
}