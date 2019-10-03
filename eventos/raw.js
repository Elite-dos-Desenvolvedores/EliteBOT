client.on('raw', async info => {
    if (info.t !== "MESSAGE_REACTION_ADD" && info.t !== "MESSAGE_REACTION_REMOVE") return
    if (info.d.message_id != "566982078625873931") return

    let server = client.guilds.get(guild.id)
    let member = server.members.get(info.d.user_id)

    let role1 = server.roles.get('622941407509741589'), // C
        role2 = server.roles.get('627548272885760021'), // C++
        role3 = server.roles.get('627548355173548042'), // C#
        role4 = server.roles.get('622941463487053835'), // Java
        role5 = server.roles.get('622941569384972308'), // Javascript
        role6 = server.roles.get('622941592759566337'), // Kotlin
        role7 = server.roles.get('622941618445615117'), // PHP
        role8 = server.roles.get('622941651257655308'), // GO
        role9 = server.roles.get('622941668521410581'), // HTML
        role10 = server.roles.get('622941753875628053'), // CSS
        role11 = server.roles.get('627547764708081665'), // Rust

        if (info.t === "MESSAGE_REACTION_ADD") {
            if (info.d.emoji.name === "🇦") {
                if (member.roles.has(role1)) return
                member.addRole(role1)
            } else if (info.d.emoji.name === "🇧") {
                if (member.roles.has(role2)) return
                member.addRole(role2)
            } else if (info.d.emoji.name === "🇨") {
                if (member.roles.has(role3)) return
                member.addRole(role3)
            } else if (info.d.emoji.name === "🇩") {
                if (member.roles.has(role4)) return
                member.addRole(role4)
            } else if (info.d.emoji.name === "🇪") {
                if (member.roles.has(role5)) return
                member.addRole(role5)
            } else if (info.d.emoji.name === "🇫") {
                if (member.roles.has(role6)) return
                member.addRole(role6)
            } else if (info.d.emoji.name === "🇬") {
                if (member.roles.has(role7)) return
                member.addRole(role7)
            } else if (info.d.emoji.name === "🇭") {
                if (member.roles.has(role8)) return
                member.addRole(role8)
            } else if (info.d.emoji.name === "🇮") {
                if (member.roles.has(role9)) return
                member.addRole(role9)
            } else if (info.d.emoji.name === "🇯") {
                if (member.roles.has(role10)) return
                member.addRole(role10)
            } else if (info.d.emoji.name === "🇰") {
                if (member.roles.has(role11)) return
                member.addRole(role11)
            }
        }
    if (info.t === "MESSAGE_REACTION_REMOVE") {
        if (info.d.emoji.name === "🇦") {
            if (member.roles.has(role1)) return
            member.removeRole(role1)
        } else if (info.d.emoji.name === "🇧") {
            if (member.roles.has(role2)) return
            member.removeRole(role2)
        } else if (info.d.emoji.name === "🇨") {
            if (member.roles.has(role3)) return
            member.removeRole(role3)
        } else if (info.d.emoji.name === "🇩") {
            if (member.roles.has(role4)) return
            member.removeRole(role4)
        } else if (info.d.emoji.name === "🇪") {
            if (member.roles.has(role5)) return
            member.removeRole(role5)
        } else if (info.d.emoji.name === "🇫") {
            if (member.roles.has(role6)) return
            member.removeRole(role6)
        } else if (info.d.emoji.name === "🇬") {
            if (member.roles.has(role7)) return
            member.removeRole(role7)
        } else if (info.d.emoji.name === "🇭") {
            if (member.roles.has(role8)) return
            member.removeRole(role8)
        } else if (info.d.emoji.name === "🇮") {
            if (member.roles.has(role9)) return
            member.removeRole(role9)
        } else if (info.d.emoji.name === "🇯") {
            if (member.roles.has(role10)) return
            member.removeRole(role10)
        } else if (info.d.emoji.name === "🇰") {
            if (member.roles.has(role11)) return
            member.removeRole(role11)
        }
    }
})