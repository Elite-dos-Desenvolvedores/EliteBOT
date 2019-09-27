exports.run = (client) => {

const Discord = require("discord.js")
console.log('log', `O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`)
client.user.setPresence({ game: { name: `Faça parte da Elite`, url: "https://discord.gg/eVtjTFy", type: 1, name: `Estou online para ${client.users.size} usuários!`, url: "https://discord.gg/eVtjTFy", type: 2} });
       
//     client.setInterval(() => {
//             client.Database.Reppers.find({}, function (erro, documento) {
//                          if (documento) {
//             for(let i in documento) {
//             console.log(documento[i])
//             let time = documento[i].time
//             let user = documento[i]._id
        
   
        
//                     if(Date.now() > time) {
//             client.Database.Reppers.findOneAndDelete({"_id": user})   
    
                        
// }}}})}, 1800000)
}