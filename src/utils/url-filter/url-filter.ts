const urlWhitelist = require('./path-whitelist.json')

function checkIfContainsPath(clientUrl: any): boolean {
    const key: string = 'allowed_paths'
    return urlWhitelist[key].includes(clientUrl)

}

export default checkIfContainsPath;
