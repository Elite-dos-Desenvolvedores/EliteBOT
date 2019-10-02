var Vibrant = require("node-vibrant");

exports.run = (bot, message, args) => {
    if (!message.member.roles.find(role => role.name === "Parceiro")) {
        message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))
    }

    var readOnly = !bot.config.defaultOnlyChannels.includes(message.channel.name.toLowerCase());
    var mention = bot.utils.mention(message.author.id);

    function reply(msg) {
        message.channel.send(`${mention}${msg}`);
    }

    function removeAccents(text) {
        return text.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ã", "a");
    };
    var colorRoles = message.guild.roles.filter(r => r.name.includes("Cor "));

    function removeFirstWord(text) {
        return text.split(" ").slice(1).join(" ")
    };
    var search = args.join(" ").toLowerCase();
    switch (search) {
        case "remover":
        case "excluir":
            message.member.roles.remove(colorRoles, "Comando de cor.");
            if (!readOnly) reply("Sua cor foi removida.");
            break;

        case "avatar":
            if (!readOnly) {
                var image = message.author.displayAvatarURL({
                    format: "png",
                    size: 128
                });
                message.channel.send("🔍 | Processando...").then(msg => {
                    var colors = colorRoles.array().map(r => r = r.hexColor.slice(1));

                    function getSimilarColor(color) {
                        var base_colors = colors;
                        var color_r = color[0];
                        var color_g = color[1];
                        var color_b = color[2];
                        var differenceArray = [];
                        Array.min = function (array) {
                            return Math.min.apply(Math, array)
                        };
                        base_colors.forEach(function (code) {
                            var base_color_rgb = hex2rgb(code);
                            var base_colors_r = base_color_rgb.split(',')[0];
                            var base_colors_g = base_color_rgb.split(',')[1];
                            var base_colors_b = base_color_rgb.split(',')[2];
                            differenceArray.push(Math.sqrt((color_r - base_colors_r) * (color_r - base_colors_r) + (color_g - base_colors_g) * (color_g - base_colors_g) + (color_b - base_colors_b) * (color_b - base_colors_b)))
                        });
                        var lowest = Array.min(differenceArray);
                        var index = differenceArray.indexOf(lowest);

                        function hex2rgb(colour) {
                            var r, g, b;
                            if (colour.charAt(0) == '#') {
                                colour = colour.substr(1)
                            }
                            r = colour.charAt(0) + colour.charAt(1);
                            g = colour.charAt(2) + colour.charAt(3);
                            b = colour.charAt(4) + colour.charAt(5);
                            r = parseInt(r, 16);
                            g = parseInt(g, 16);
                            b = parseInt(b, 16);
                            return r + ',' + g + ',' + b
                        }
                        return base_colors[index]
                    };
                    var v = new Vibrant(image);
                    v.getPalette().then(pallete => {
                        var vibrant = getSimilarColor(pallete.Vibrant.rgb);
                        var darkVibrant = getSimilarColor(pallete.DarkVibrant.rgb);
                        var lightVibrant = getSimilarColor(pallete.LightVibrant.rgb);
                        var lightMuted = getSimilarColor(pallete.LightMuted.rgb);

                        function removeDuplicates(num) {
                            var x, len = num.length,
                                out = [],
                                obj = {};
                            for (x = 0; x < len; x += 1) {
                                obj[num[x]] = 0
                            }
                            for (x in obj) {
                                out.push(x)
                            }
                            return out
                        }
                        var rolesFromColor = [colorRoles.filter(r => r.hexColor == `#${vibrant}`).first(), colorRoles.filter(r => r.hexColor == `#${darkVibrant}`).first(), colorRoles.filter(r => r.hexColor == `#${lightVibrant}`).first(), colorRoles.filter(r => r.hexColor == `#${lightMuted}`).first()];
                        msg.edit(" ", new Discord.MessageEmbed()
                            .setColor(message.guild.roles.resolve(bot.config.botRole).hexColor)
                            .setAuthor(message.author.username, image)
                            .setFooter(bot.user.username, bot.user.displayAvatarURL())
                            .setDescription(`Algumas destas cores podem combinar com o seu avatar: \n${removeDuplicates(rolesFromColor).join(", ")}.`));
                    }).catch((e) => reply("Algo deu errado." + e));
                });

            };
            break;
        default:
            if (args.length < 1) {
                if (!readOnly) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor(message.guild.roles.resolve(bot.config.botRole).hexColor)
                        .setAuthor(message.author.username, message.author.displayAvatarURL())
                        .setTitle("Cores Disponíveis")
                        .setFooter(bot.user.username, bot.user.displayAvatarURL())
                        .setDescription(`${colorRoles.sort((a, b) => {if(a.position >= b.position){return 1} else {return -1}}).array().join(", ")}\n\nDigite \`${bot.config.prefix}cor <nome da cor que você quiser>\`.\nNão é necessário escrever "Cor" antes do nome dela.\n\nPara remover sua cor atual, use \`${bot.config.prefix}cor remove\` (o bot automaticamente tira sua outra cor ao escolher).\n⭐ Para receber uma sugestão de cor que combine com o seu avatar, use \`${bot.config.prefix}cor avatar\`. ⭐`))
                };
            } else {
                let resultsC = colorRoles.filter(r => removeAccents(r.name.toLowerCase()).includes(removeAccents(search)));
                let results = resultsC.array().sort(function (a, b) {
                    if (a.name.length >= b.name.length) {
                        return 1
                    } else {
                        return -1
                    }
                });
                if (results.length < 1) {
                    if (!readOnly) reply("Nenhum cargo pôde ser encontrado. Execute o comando sem argumentos para ver uma lista de cores disponíveis.");
                } else {
                    var role = results[0];
                    if (message.member.roles.some(r => r == role)) {
                        if (!readOnly) reply(`Você já tem o cargo \`${removeFirstWord(role.name)}\`.`);
                    } else {
                        message.member.roles.remove(colorRoles, "Comando de cor.").then(() => message.member.roles.add(role, "Comando de cor."));
                        if (!readOnly) reply(`A cor \`${removeFirstWord(role.name)}\` foi adicionada a você.`);
                    };
                };
            };
            break;
    };
    if (readOnly) message.delete();
};

exports.help = {
    name: 'cor'
}