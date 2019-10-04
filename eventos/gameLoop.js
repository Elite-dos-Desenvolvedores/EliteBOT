exports.run = async (client) =>{
    const sleep = time => new Promise(resolve => {
        setTimeout(resolve, time)
    })
    var i;
    console.log("O loop presence foi ativado!\n")

    for (i=0; i<10;){
        client.user.setPresence({ game: { name: `Seja parte da Elite!`, url: "https://discord.gg/EhjgQ24", type: 1} });
        await sleep(60000)
        client.user.setPresence({ game: { name: "Para saber meus comandos digite !ajuda", type: 0 } });
        await sleep(60000)
        client.user.setPresence({ game: { name: `${client.users.size} usuários nesta comunidade! YAY`, type: 3} });
        await sleep(60000)
        client.user.setPresence({ game: { name: `Krunker com a galera! :)`, type: 20} });
        await sleep(60000)
        client.user.setPresence({ game: { name: `Meu criador é o Vitagliano#7027`, url: "https://twitter.com/gbrlrusso", type: 3} });
        await sleep(60000)
    }
}