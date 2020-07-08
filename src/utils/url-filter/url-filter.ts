let urlWhitelist = require('./url-whitelist.json')

function checkIfContainsUrl(clientUrl: any): boolean {
    return urlWhitelist["allowed_urls"].includes(clientUrl)

}

export default checkIfContainsUrl;
