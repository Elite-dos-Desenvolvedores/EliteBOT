const Discord = require("discord.js")
const Database = require('../../database.js')

exports.run = async (client, message, args) => {
  
  const valor = parseInt(args[1]);

  let member = message.mentions.users.first();
  if (!member) return message.reply("mencione um usuário para enviar um pagamento.");
  if (member.id === message.author.id) return message.reply("você não pode fazer um pagamento para você mesmo!");
  if (isNaN(args[1])) return message.reply('valor de coins inválido, insira um valor válido');
  if (parseInt(valor) <= 0) return message.reply('o valor tem que ser maior que 0.');
  
  let doador = await Database.Users.findOne({
    '_id': message.author.id
  });

  if (doador.coins < valor) return message.reply("você não tem coins suficientes para isso!");

  let membro = await Database.Users.findOne({
    '_id': member.id
  });

  doador.coins -= valor
  membro.coins += valor
  membro.save();
  doador.save();

  await message.channel.send(`${message.author} você enviou **${valor}** para ${member} com sucesso.`);
}

exports.help = {
  name: 'pay',
  aliases: ['pagar', 'doar'],
}