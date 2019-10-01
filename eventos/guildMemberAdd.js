exports.run = (client, member) => {

  let greetingChannel = client.channels.get("622162639484616734")
  greetingChannel.send(`${member.user} entrou no servidor!`)

}