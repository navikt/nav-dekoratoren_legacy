let urlWhitelist = require('./url-whitelist.json')

function checkIfContainsUrl(clientUrl: string) {
    return urlWhitelist["allowed_urls"].includes(clientUrl)

}

export default checkIfContainsUrl;
