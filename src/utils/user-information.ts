/*
TODO Avgjøre om det trengs å ta personvernrelaterte hensyn her (ref lokasjon f.eks.)
*/
interface UserInformation {
    coockiesEnabled: boolean,
    language: string,
    platform: string,
    userAgent: string,
    webDriver: boolean,
}

export default function gatherInformation(userNavigator: Navigator) {
    let userInformation: UserInformation = {
        coockiesEnabled: userNavigator.cookieEnabled,
        language: userNavigator.language,
        platform: userNavigator.platform,
        userAgent: userNavigator.userAgent,
        webDriver: userNavigator.webdriver,
    }

    return userInformation
}
