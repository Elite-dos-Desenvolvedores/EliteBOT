const FortClient = require('fortnite')
const fortnite = new FortClient('../config.json')

exports.run = (client, message, args) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  if (!razaou.length < 1) {
    var plataformas = ['xbl', 'pc', 'ps4']
    var plataforma

    if (plataformas.includes(args[0].toLowerCase())) {
      plataforma = args[0].toLowerCase()

      if (!razaod.length < 1) {
        fortnite.user(`${args[1]}`, plataforma).then(usuario => {
          message.channel.sendMessage({
            'embed': {
              'color': 'RANDOM',
              'timestamp': new Date(),
              'footer': {
                'icon_url': message.author.displayAvatarURL,
                'text': message.author.username
              },
              'thumbnail': {
                'url': 'https://i.imgur.com/ZjtLNE9.jpg'
              },
              'author': {
                'name': `${usuario.username}`,
                'icon_url': message.author.displayAvatarURL
              },
              'fields': [{
                'name': ':notepad_spiral: Username:',
                'value': `${usuario.username}`,
                'inline': true
              },
              {
                'name': ':video_game: Plataforma:',
                'value': `${usuario.platform}`,
                'inline': true
              },
              {
                'name': ':sunglasses: Solo:',
                'value': `**Kd:** ${usuario.stats.solo.kd}\n**Pontuação:** ${Number(usuario.stats.solo.score).toLocaleString()}\n**Partidas:** ${Number(usuario.stats.solo.matches).toLocaleString()}\n**Vitórias:** ${Number(usuario.stats.solo.wins).toLocaleString()}`,
                'inline': true
              },
              {
                'name': ':handshake: Duo:',
                'value': `**Kd:** ${usuario.stats.duo.kd}\n**Pontuação:** ${Number(usuario.stats.duo.score).toLocaleString()}\n**Partidas:** ${Number(usuario.stats.duo.matches).toLocaleString()}\n**Vitórias:** ${Number(usuario.stats.duo.wins).toLocaleString()}`,
                'inline': true
              },
              {
                'name': ':fingers_crossed: Squad:',
                'value': `**Kd:** ${usuario.stats.squad.kd}\n**Pontuação:** ${Number(usuario.stats.squad.score).toLocaleString()}\n**Partidas:** ${Number(usuario.stats.squad.matches).toLocaleString()}\n**Vitórias:** ${Number(usuario.stats.squad.wins).toLocaleString()}`,
                'inline': true
              },
              {
                'name': ':trophy: Total:',
                'value': `**Kd:** ${(usuario.stats.solo.kd + usuario.stats.duo.kd + usuario.stats.squad.kd)}\n**Pontuação:** ${Number(usuario.stats.solo.score + usuario.stats.duo.score + usuario.stats.squad.score).toLocaleString()}\n**Partidas:** ${Number(usuario.stats.solo.matches + usuario.stats.duo.matches + usuario.stats.squad.matches).toLocaleString()}\n**Vitórias:** ${Number(usuario.stats.solo.wins + usuario.stats.duo.wins + usuario.stats.squad.wins).toLocaleString()}`,
                'inline': true
              }
              ]
            }
          })
        }).catch(err => {
          message.channel.sendMessage(':x: **Usuário não encontrado.**')
        })
      } else {
        message.channel.sendMessage(':x: **Diga o username da conta.**')
      }
    } else {
      message.channel.sendMessage(`:x: **Plataforma inválida:** \`${plataformas.join('` **|** `')}\``)
    }
  } else {
    message.channel.sendMessage(':x: **Diga a plataforma da conta.**')
  }
}

exports.help = {
    name: 'fortnite'
}