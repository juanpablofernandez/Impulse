const Discord = module.require("discord.js");
const request = require('request');
const HashtagManager = require('../helpers/hashtagManager.js');

module.exports.run = async (bot, message, args) => {
    let keywords = args[0].split(',');
    let dots = ``;
    if(args[1] === `dots` || args[1] === `d`) {
        dots = `•\n•\n•\n•\n•\n`;
    }

    HashtagManager.getTags(keywords, "top", 30).then(tags => {
        if(!tags) return;
        message.channel.send(`${dots}${tags}`);
    })
}

module.exports.help = {
    names: ["tags", "hashtags", "tag"],
}
