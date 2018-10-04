const Discord = module.require("discord.js");
const request = require('request');
const HashtagManager = require('../helpers/hashtagManager.js');

module.exports.run = async (bot, message, args) => {
    let tag = args[0];

    HashtagManager.getTags(tag, (tags) => {
        console.log(tags);
        message.channel.send(`\`\`\`${tags}\`\`\``);
    });
}

module.exports.help = {
    names: ["tags", "hashtags"],
}
