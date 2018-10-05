const request = require('request');
const rp = require('request-promise-native');


let getTags = async (tags, sort, limit) => {
    let hashtagList = []
    let rankedTags = []

    for (const tag of tags) {
        let url = `https://d212rkvo8t62el.cloudfront.net/tag/${tag}`;

        let body = await rp(url);
        let data = JSON.parse(body);

        if(data[`tagExists`]) {
            if(sort === `top`) {

                rankedTags.push.apply(rankedTags, data.results)

            } else if(sort === `random`) {
                console.log(sort);
            }
        }
    }

    rankedTags = sortByRank(rankedTags);
    rankedTags.forEach(rankedTag => {
        hashtagList.push(`#${rankedTag.tag}`);
    })

    hashtagList = Array.from(new Set(hashtagList));
    hashtagList = hashtagList.slice(0,limit)
    return hashtagList.join(" ")
}

function sortByRank(list) {
    // Sort by ranking
    let rankedTags = list.sort((a, b) => {
        var keyA = a.rank,
            keyB = b.rank;
        // Compare the 2 ranks
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
    })
    return rankedTags
}

module.exports.getTags = getTags
