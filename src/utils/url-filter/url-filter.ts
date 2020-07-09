let urlWhitelist = require('./path-whitelist.json')

function checkIfContainsPath(clientUrl: any): boolean {
    return urlWhitelist["allowed_paths"].includes(clientUrl)

}

export default checkIfContainsPath;
