/*
TODO Avgjøre om det trengs å ta personvernrelaterte hensyn her (ref lokasjon f.eks.)
*/
var visitorInformation: {
    coockiesEnabled = boolean,
    browserLanguage: string,
    language: string,
    platform: string,
    connectionSpeed: string,
    userAgent: string,
    webDriver: boolean,
}

const dictionary: { [parameter: string]: string } = {
    a: 'foo',
    b: 'bar',
}

export default function gatherInformation(userNavigator: Navigator) {
    visitorInformation.coockiesEnabled = userNavigator.cookieEnabled;
    //visitorInformation.browserLanguage = userNavigator.browserLanguage;
    visitorInformation.language = userNavigator.language;
    visitorInformation.platform = userNavigator.platform;
    //visitorInformation.connectionSpeed = userNavigator.connectionSpeed;
    visitorInformation.userAgent = userNavigator.userAgent;
    visitorInformation.webDriver = userNavigator.webdriver;
    //visitorInformation.geolocation = userNavigator.geolocation;


    return visitorInformation
}