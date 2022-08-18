# Nav-dekoratoren ![nav.no logo](src/ikoner/meny/NavLogoRod.svg)

![Deploy til prod](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-prod/badge.svg) | ![Deploy til dev](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-dev/badge.svg)

Node.js Express applikasjon med frontend-komponenter i React.<br>

## Bruk av dekoratøren

Dekoratøren serveres på følgende ingresser:

**Prod (prod-gcp)**

-   https://www.nav.no/dekoratoren/
-   https://appres.nav.no/common-html/v4/navno (deprecated)

**Dev (dev-gcp)**

-   https://www.dev.nav.no/dekoratoren/
-   https://dekoratoren.dev.nav.no/
-   https://dekoratoren.ekstern.dev.nav.no/ (tilgjengelig fra åpent internett)

_Merk:_ Dekoratøren på disse ingressene har som mål å være relativt stabil både funksjonelt og visuelt, og skal kunne brukes av team/applikasjoner som også kjører i diverse testmiljøer. Enkelte console-feil og avvik kan allikevel forekomme, så ta kontakt på #dekoratøren_på_navno hvis noe oppleves som rart.

**Beta (dev-gcp)**

-   https://dekoratoren-beta.dev.nav.no/

_Merk:_ Dekoratøren på denne ingressen er kun ment brukt for testing av pågående utvikling, og bør ikke konsumeres av andre applikasjoner siden den kan være ustabil eller inneholde feil.

## Implementasjon

Dekoratøren kan implementeres på flere ulike måter, både server-side og client-side.
Ved bruk av Node.js kan [@navikt/nav-dekoratoren-moduler](https://github.com/navikt/nav-dekoratoren-moduler#readme) benyttes.

### Eksempel 1

Hent dekoratøren server-side og send HTML til brukeren som inkluderer dekoratøren:

```
// Type
export type Props = Params & (
    | { env: "prod" | "dev" }
    | { env: "localhost"; port: number; }
);

// Bruk
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr'
injectDecoratorServerSide({ env: "dev", filePath: "index.html", simple: true, chatbot: true })
    .then((html) => {
        res.send(html);
    })
    .catch((e) => {
        ...
    })
```

[Eksempel i Personopplysninger](https://github.com/navikt/personopplysninger/blob/master/server/dekorator.js). <br>
Ved bruk av andre teknologier kan dekoratøren hentes ved hjelp av HTTP kall. <br>Eksempel i
pseudokode:

```
fetch("{MILJO_URL}/?{DINE_PARAMETERE}").then(res => {
    const document = createDocFromRes(res);

    const styles = document.getElementById("styles")?.innerHTML;
    const scripts = document.getElementById("scripts")?.innerHTML;
    const header = document.getElementById("header-withmenu")?.innerHTML;
    const footer = document.getElementById("footer-withmenu")?.innerHTML;

    /*
    Inject fragmenter av dekoratøren i HTML,
    enten manuelt eller ved bruk av template engine.
    */
});
```

### Eksempel 2

:warning: &nbsp; Bruk av client-side rendering kan gi en redusert brukeropplevelse, med "flicker"/layout shifting når headeren renderes.

Alt 1 - Hent dekoratøren client-side vha. [@navikt/nav-dekoratoren-moduler](https://github.com/navikt/nav-dekoratoren-moduler#readme): <br>

```
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler'
injectDecoratorClientSide({
    env: "localhost",
    port: 8100,
    enforceLogin: true,
    level: "Level4",
    redirectToApp: true,
});
```

Alt 2 - Sett inn noen linjer HTML:

```
<html>
  <head>
      <link href="{MILJO_URL}/css/client.css" rel="stylesheet" />
  </head>
  <body>
    <div id="decorator-header"></div>
    {
      DIN_APP
    }
    <div id="decorator-footer"></div>
    <div id="decorator-env" data-src="{MILJO_URL}/env?{DINE_PARAMETERE}"></div>
    <script async="true" src="{MILJO_URL}/client.js"></script>
  </body>
</html>
```

## Parametere

Dekoratøren kan tilpasses med følgende [URL-parametere / query-string](https://en.wikipedia.org/wiki/Query_string). <br>

| Parameter          | Type                                              | Default          | Forklaring                                                                     |
| ------------------ | ------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| context            | privatperson / arbeidsgiver / samarbeidspartner   | privatperson     | Setter menyen til definert kontekst                                            |
| simple             | boolean                                           | false            | Viser en forenklet header og footer                                            |
| simpleHeader       | boolean                                           | false            | Viser en forenklet header                                                      |
| simpleFooter       | boolean                                           | false            | Viser en forenklet footer                                                      |
| enforceLogin       | boolean                                           | false            | Sørger for at brukeren er innlogget på definert sikkerhetsnivå (level) [1]     |
| redirectToApp      | boolean                                           | false (ditt-nav) | Sender brukeren tilbake til nåværende url etter innlogging via dekoratøren [2] |
| redirectToUrl      | string                                            | undefined        | Sender brukeren til denne url'en etter innlogging via dekoratøren [2]          |
| level              | Level3 / Level4                                   | Level3           | Gir brukeren innloggingsvalg basert på definert sikkerhetsnivå [2]             |
| language           | nb / nn / en / se / pl                            | nb               | Setter språket til dekoratøren ved server side rendering [3]                   |
| availableLanguages | [{ locale: nb / nn / en / se / pl, url: string }] | [ ]              | Setter alternativene til språkvelgeren ved server side rendering [4]           |
| breadcrumbs        | [{ title: string, url: string }]                  | [ ]              | Setter brødsmulestien for server side rendering [5]                            |
| utilsBackground    | white / gray / transparent                        | transparent      | Setter bakgrunnsfargen på containeren til brødsmulesti og språkvelger          |
| feedback           | boolean                                           | false            | Skjuler eller viser tilbakemeldingskomponenten                                 |
| chatbot            | boolean                                           | true             | Aktiverer eller deaktiverer Chatbot Frida [6]                                  |
| chatbotVisible     | boolean                                           | false            | Skjuler eller viser Chatbot Frida [7]                                          |
| urlLookupTable     | boolean                                           | true             | Aktiverer eller deaktiverer url-lookup-table [8]                               |
| shareScreen        | boolean                                           | true             | Aktiverer eller deaktiverer skjerdelingskomponent                              |
| logoutUrl          | string                                            | undefined        | Setter url for logg-ut knappen [9]                                             |

[1] Kombineres med **level**, **redirectToApp** og [EnforceLoginLoader](https://github.com/navikt/nav-dekoratoren-moduler#readme) ved behov. <br>
[2] Gjelder både ved automatisk innlogging og ved klikk på innloggingsknappen. <br>
[3] Språk settes automatisk client-side dersom nåværende url inneholder **/nb/**, **/nn/**, **/en/**, **/se/**, uavhengig av dette parameteret. <br>
[4] Kan settes client-side med [setAvailableLanguages](https://github.com/navikt/nav-dekoratoren-moduler#readme) og [onLanguageSelect](https://github.com/navikt/nav-dekoratoren-moduler#readme) <br>
[5] Kan settes client-side med [setBreadcrumbs](https://github.com/navikt/nav-dekoratoren-moduler#readme) og [onBreadcrumbClick](https://github.com/navikt/nav-dekoratoren-moduler#readme) <br>
[6] Aktiverer/deaktiverer Chatbot Frida. Dersom dette settes til false, vil chatbot aldri vises på siden, selv om bruker har en aktiv chat-sesjon. <br>
[7] Viser/skjuler Chatbot Frida. Dersom dette settes til true, vil chatbot alltid vises. Ved false vises chatbot kun når bruker har en aktiv chat-sesjon (med mindre 'chatbot' er satt til false) <br>
[8] Mapper prod-urler til dev-urler basert på [url-lookup-table](https://github.com/navikt/nav-dekoratoren-moduler/blob/master/src/csr/url-lookup-table/table.ts). <br>
[9] Dersom denne er satt vil dekoratørens utloggingsfunksjonalitet forbigåes, og **alt rundt utlogging må håndteres av appen.**

Samtlige parametre kan settes [client-side](https://github.com/navikt/nav-dekoratoren-moduler#readme) <br>

Bakgrunnsfarge på brødsmulesti og språkvelger kan overstyres:

```
.decorator-utils-container {
    background: #f1f1f1;
}
```

### Eksempler

Eksempel 1 - Endre context:<br>
https://www.nav.no/dekoratoren/?context=arbeidsgiver

Eksempel 2 - Håndhev innlogging:<br>
https://www.nav.no/dekoratoren/?enforceLogin=true&level=Level4&redirectToApp=true

Eksempel 3 - Språkvelger:<br>
[https://www.nav.no/dekoratoren/?availableLanguages=\[{"locale":"nb","url":"https://www.nav.no/person/kontakt-oss"},{"locale":"en","url":"https://www.nav.no/person/kontakt-oss/en/"}\] ](https://www.nav.no/dekoratoren/?availableLanguages=[{"locale":"nb","url":"https://www.nav.no/person/kontakt-oss"},{"locale":"en","url":"https://www.nav.no/person/kontakt-oss/en/"}])

Eksempel 4 - Brødsmulesti:<br>
[https://www.nav.no/dekoratoren/?breadcrumbs=\[{"url":"https://www.nav.no/person/dittnav","title":"Ditt NAV"},{"url":"https://www.nav.no/person/kontakt-oss","title":"Kontakt oss"}\] ](https://www.nav.no/dekoratoren/?breadcrumbs=[{"url":"https://www.nav.no/person/dittnav","title":"Ditt%20NAV"},{"url":"https://www.nav.no/person/kontakt-oss","title":"Kontakt%20oss"}])

(Språkvelger og brødsmulesti vises ikke direkte på /dekoratoren i prod av sikkerhetsmessige årsaker)

## Oppstart via docker-compose

Start **navikt/nav-dekoratoren**, **navikt/pb-nav-mocked**, **navikt/stub-oidc-provider** og **navikt/pb-oidc-provider-gui**. Oppsettet vil replikere innlogging og eksterne avhengigheter som varselinnboks.

```
dekoratoren:
    container_name: dekoratoren
    image: 'docker.pkg.github.com/navikt/nav-dekoratoren/nav-dekoratoren:latest'
    ports:
      - "8100:8088"
    environment:
      ENV: 'localhost' | 'dev' | "prod"
      XP_BASE_URL: 'https://www.nav.no'
      APP_BASE_URL: 'http://localhost:8100'
      APP_BASE_PATH: '/dekoratoren'
      API_XP_SERVICES_URL: 'https://www.nav.no/_/service'
      API_UNLEASH_PROXY_URL: 'https://www.nav.no/person/pb-unleash-proxy'
      API_INNLOGGINGSLINJE_URL: 'http://mocks:8080/innloggingslinje-api/auth'
      API_VARSELINNBOKS_URL: 'http://mocks:8080/person/varselinnboks'
      MINSIDE_ARBEIDSGIVER_URL: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/'
      DITT_NAV_URL: 'https:/www.nav.no/person/dittnav/'
      LOGIN_URL: 'http://localhost:5000'
      LOGOUT_URL: 'http://localhost:5000/?logout'
    depends_on:
      - mocks
```

[Eksempel i frontend for Enonic XP](https://github.com/navikt/nav-enonicxp-frontend/blob/master/docker-compose.yml). <br>
:information_source: &nbsp; Krever GitHub Packages (ghcr.io) innlogging:

```
docker login ghcr.io -u GITHUB_USERNAME -p GITHUB_PERSONAL_ACCESS_TOKEN
```

## Utvikling - Kom i gang

Hent repoet fra github

```
git clone https://github.com/navikt/nav-dekoratoren.git
```

Installer nødvendige avhengigheter

```
npm install
```

Start eksterne tjenester som oidc-provider og mocks

```
docker-compose up -d
```

Kjør applikasjonen lokalt med hot-reloading

```
npm start
```

Starter en Node Express / dev - server på <br> http://localhost:8088/dekoratoren

## Manuelt bygg

```
npm run build-dev (for testing lokalt)
npm run build-prod (for produksjon)
```

## Deploy til dev-miljø

Start deploy workflow via Github web-UI: Actions -> Workflows -> Deploy-to-dev -> Run workflow

## Prodsetting

-   Lag en PR til master, og merge inn etter godkjenning
-   Lag en release på master med versjon-bump, beskrivende tittel og oppsummering av endringene dine
-   Publiser release'en for å starte deploy til prod

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
