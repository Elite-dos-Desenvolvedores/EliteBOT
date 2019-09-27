var fortunes = [
    "Sim",
    "Não",
    "Talvez",
    "Eu não sei, tente de novo",
    "Quem sabe?",
    "Isso é um mistério",
    "Não posso te contar",
    "Meu informante disse que não",
    "Provavelmente",
    "Me pergunte mais tarde!",
    "Claro que não!",
    "Não conte comigo para isso",
    "Dúvido muito"

  ];
  
  exports.run = (bot, msg, params) => {
  
    if(!params[0]){
      return msg.channel.send(":x: " + "| Por favor insira uma pergunta!")
    }
    if (params[0]) msg.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    else msg.channel.send(":x: " + "| Não foi possível ler sua pergunta! :(");
  
  };
  
  
  exports.help = {
    name : "8ball",
    description: "Te da resposta para suas perguntas!",
    usage: "8ball [pergunta]"
  };