let urlBlacklist = require('./url-blacklist.json')

function checkIfContainsUrl(clientUrl: string) {
    return urlBlacklist["blocked_urls"].includes(clientUrl)

}

export default checkIfContainsUrl;
