const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAntMu3piyFukdVknRsh5kO09dr1pr5hJw');
const opus = require("opusscript");
const gyp = require("node-gyp");

exports.run = async (client, message, args, queue) => {

  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('você não possui permissão para executar esse comando.')
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);

  if (!message.member.voiceChannel) return message.channel.send(message.author + ', você não está em um canal de voz!');
  if (!serverQueue) return message.channel.send(message.author + ', não há nada tocando no momento.');
  if (!args1[1]) return message.channel.send(`O volume atual é: **${serverQueue.volume}**`);
  serverQueue.volume = args1[1];
  if (args1[1] > 100) return message.reply("Seu ouvido está sangrará de tão alto!");
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args1[1] / 100);

  message.channel.send(`Eu configurei o volume para: **${args1[1]}**`);

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
        console.error(`Não consegui entrar no canal de voz: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Não consegui entrar no canal de voz: ${error}`);
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
        else console.log("VOLUME " + reason);
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
  name: "volume"
}