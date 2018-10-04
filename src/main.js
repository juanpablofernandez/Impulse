require('dotenv').config();
const Discord = require('discord.js');
const fs = require("fs");
const { BOT_PREFIX, BOT_TOKEN } = process.env;


const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./src/cmds/", (err, files) => {
    if (err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsFiles.length} commands!`);
    jsFiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded!`);
        props.help.names.forEach(name => {
            bot.commands.set(name, props);
        })
    })
})

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}!`);
    // bot.user.setActivity('!help', { type: 'PLAYING' })

    // bot.generateInvite(["ADMINISTRATOR"]).then(link => {
    //     console.log(link);
    // })
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ")
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(BOT_PREFIX)) return;

    let cmd = bot.commands.get(command.slice(BOT_PREFIX.length));
    if(cmd) cmd.run(bot, message, args);
});

bot.login(BOT_TOKEN);
