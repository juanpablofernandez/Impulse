module.exports.run = async (bot, message, args) => {
    let count = args[0]

    if(!isInt(count)) {
        count = 100
    }

    const fetched = await message.channel.fetchMessages({limit: count});

    message.channel.bulkDelete(fetched).catch(err => {
        // console.log(err);
        throw err;
    });

}

function isInt(value) {
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}

module.exports.help = {
    names: ["clear"],
}
