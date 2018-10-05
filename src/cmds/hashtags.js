const Discord = module.require("discord.js");
const request = require('request');
const HashtagManager = require('../helpers/hashtagManager.js');

module.exports.run = async (bot, message, args) => {
    let tag = args[0];
    let dots = ``
    if(args[1] === `dots` || `d`) {
        dots = `•\n•\n•\n•\n•\n`
    }
    console.log(dots);
    HashtagManager.getTags(tag, (tags) => {
        message.channel.send(`${dots}${tags}`);
    });
}

module.exports.help = {
    names: ["tags", "hashtags", "tag"],
}
