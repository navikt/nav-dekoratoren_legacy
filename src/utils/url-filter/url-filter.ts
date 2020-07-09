let urlWhitelist = require('./path-whitelist.json')

function checkIfContainsPath(clientUrl: string): boolean {
    return urlWhitelist["allowed_paths"].includes(clientUrl)

}

export default checkIfContainsPath;
