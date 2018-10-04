const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
        message.channel.send(`<${link}>`)
    })
}

module.exports.help = {
    names: ["invite"],
}
