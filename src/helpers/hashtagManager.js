const request = require('request');

module.exports.getTags = async (tag, cb) => {
    let url = `https://d212rkvo8t62el.cloudfront.net/tag/${tag}`

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            let results = data.results;
            let tags = []
            for (var i = 0; i < results.length; i++) {
                let tag = `#${results[i].tag}`;
                tags.push(tag);
            }

            cb(tags.join(` `))
         }
    })
}
