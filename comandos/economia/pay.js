const Discord = require("discord.js")

exports.run = async (message, args) => {
  let member = message.mentions.users.first() || users.get(args[0])
  if (!member) return message.reply("mencione um usuário para enviar um pagamento.")
  if (member.id === message.author.id) return message.reply("você não pode fazer um pagamento para você mesmo!")
  let value = args[1]
  if (!value) return message.reply(t("commands:pay.noValue"))
  let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
  if (invalidValue) return message.reply("valor de coins invalido, insira um valor valido.")
  let donator = await database.Users.findOne({'_id': message.author.id})
  if (donator.coins < value) return message.reply("você não tem coins suficientes para isso!")
  let membro = await database.Users.findOne({'_id': member.id})
  donator.coins -= Number(value)
  membro.coins += Number(value)
  membro.save()
  donator.save()

  message.reply("coins enviado com sucesso", {member: member, value: value.toLocaleString()})
}

exports.config = {
    name: 'pay',
    aliases: ['pagar', 'doar'],
}