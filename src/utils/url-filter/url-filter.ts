let urlWhitelist = require('./url-whitelist.json')

function checkIfContainsUrl(clientUrl: string): boolean {
    return urlWhitelist["allowed_urls"].includes(clientUrl)

}

export default checkIfContainsUrl;
