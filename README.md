# nav-dekoratoren ![nav.no logo](src/ikoner/meny/NavLogoRod.svg)

![Deploy til prod](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-prod/badge.svg) | ![Deploy til dev](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-dev/badge.svg)

node.js/React applikasjon for header og footer på [nav.no](https://www.nav.no)

## Bruk av dekoratøren

Dekoratøren serveres på følgende ingresser:

**Prod (prod-gcp)**

-   http://nav-dekoratoren.personbruker (service host)
-   https://www.nav.no/dekoratoren/
-   https://appres.nav.no/common-html/v4/navno (deprecated)

**Dev (dev-gcp)**

-   http://nav-dekoratoren.personbruker (service host)
-   https://dekoratoren.ekstern.dev.nav.no/ (tilgjengelig fra åpent internett)

_Merk:_ Dekoratøren på disse ingressene skal være relativt stabil både funksjonelt og visuelt, og kan brukes av alle team/applikasjoner. Enkelte console-feil og avvik kan allikevel forekomme, så ta kontakt på #dekoratøren_på_navno dersom noe oppleves som rart.

**Beta (dev-gcp)**

Team nav.no:

-   http://nav-dekoratoren-beta.personbruker (service host)
-   https://dekoratoren-beta.dev.nav.no/

Team min side:

-   http://nav-dekoratoren-beta-tms.personbruker (service host)
-   https://dekoratoren-beta-tms.dev.nav.no/

_Merk:_ Dekoratøren på disse ingressene er ment for testing av pågående utvikling i team personbruker, og bør ikke konsumeres av andre applikasjoner ettersom de kan være ustabile i lengre perioder.

## Implementasjon

Dekoratøren består av fire elementer med unike id'er som må settes inn i HTML'en til applikasjonen din:

| Beskrivelse                | id                |
| -------------------------- | ----------------- |
| Header HTML                | `header-withmenu` |
| Footer HTML                | `footer-withmenu` |
| JavaScript og context data | `scripts`         |
| CSS                        | `styles`          |

### Med NPM-pakke

Ved bruk av Node.js kan [@navikt/nav-dekoratoren-moduler](https://github.com/navikt/nav-dekoratoren-moduler#readme) benyttes.

### Med egen implementasjon

#### Server-side rendering (anbefalt)

Hent dekoratøren server-side og send HTML til brukeren som inkluderer dekoratøren.

Eksempel:

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

#### Client-side rendering

Obs! CSR vil gi en redusert brukeropplevelse pga layout-shifting/"pop-in" når headeren rendres, og bør unngås om mulig.

Sett inn noen linjer i HTML-templaten:

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

| Parameter          | Type                                                   | Default          | Forklaring                                                                     |
| ------------------ | ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------ |
| context            | privatperson / arbeidsgiver / samarbeidspartner        | privatperson     | Setter menyen til definert kontekst                                            |
| simple             | boolean                                                | false            | Viser en forenklet header og footer                                            |
| simpleHeader       | boolean                                                | false            | Viser en forenklet header                                                      |
| simpleFooter       | boolean                                                | false            | Viser en forenklet footer                                                      |
| enforceLogin       | boolean                                                | false            | Sørger for at brukeren er innlogget på definert sikkerhetsnivå (level) [1]     |
| redirectToApp      | boolean                                                | false (ditt-nav) | Sender brukeren tilbake til nåværende url etter innlogging via dekoratøren [2] |
| redirectToUrl      | string                                                 | undefined        | Sender brukeren til denne url'en etter innlogging via dekoratøren [2]          |
| level              | Level3 / Level4                                        | Level3           | Gir brukeren innloggingsvalg basert på definert sikkerhetsnivå [2]             |
| language           | nb / nn / en / se / pl                                 | nb               | Setter språket til dekoratøren ved server side rendering [3]                   |
| availableLanguages | [{ locale: nb / nn / en / se / pl, url: string }]      | [ ]              | Setter alternativene til språkvelgeren ved server side rendering [4]           |
| breadcrumbs        | [{ title: string, url: string, handleInApp?: string }] | [ ]              | Setter brødsmulestien for server side rendering [5]                            |
| utilsBackground    | white / gray / transparent                             | transparent      | Setter bakgrunnsfargen på containeren til brødsmulesti og språkvelger          |
| feedback           | boolean                                                | false            | Skjuler eller viser tilbakemeldingskomponenten                                 |
| chatbot            | boolean                                                | true             | Aktiverer eller deaktiverer Chatbot Frida [6]                                  |
| chatbotVisible     | boolean                                                | false            | Skjuler eller viser Chatbot Frida [7]                                          |
| urlLookupTable     | boolean                                                | true             | Aktiverer eller deaktiverer url-lookup-table [8]                               |
| shareScreen        | boolean                                                | true             | Aktiverer eller deaktiverer skjermdelingskomponent                             |
| logoutUrl          | string                                                 | undefined        | Setter url for logg-ut knappen [9]                                             |
| maskHotjar         | boolean                                                | true             | Maskerer hele HTML-dokumentet fra Hotjar [10]                                  |

[1] Kombineres med **level**, **redirectToApp** og [EnforceLoginLoader](https://github.com/navikt/nav-dekoratoren-moduler#readme) ved behov. <br>
[2] Gjelder både ved automatisk innlogging og ved klikk på innloggingsknappen. <br>
[3] Språk settes automatisk client-side dersom nåværende url inneholder **/no/**, **/nb/**, **/nn/**, **/en/**, **/se/**, uavhengig av dette parameteret. <br>
[4] Kan settes client-side med [setAvailableLanguages](https://github.com/navikt/nav-dekoratoren-moduler#readme) og [onLanguageSelect](https://github.com/navikt/nav-dekoratoren-moduler#readme).
Dersom du oppgir `handleInApp`, så må du selv håndtere feks route change i applikasjonen din ved klikk i dekoratørmenyen. <br>
[5] Kan settes client-side med [setBreadcrumbs](https://github.com/navikt/nav-dekoratoren-moduler#readme) og [onBreadcrumbClick](https://github.com/navikt/nav-dekoratoren-moduler#readme) <br>
[6] Aktiverer/deaktiverer Chatbot Frida. Dersom dette settes til false, vil chatbot aldri vises på siden, selv om bruker har en aktiv chat-sesjon. <br>
[7] Viser/skjuler Chatbot Frida. Dersom dette settes til true, vil chatbot alltid vises. Ved false vises chatbot kun når bruker har en aktiv chat-sesjon (med mindre 'chatbot' er satt til false) <br>
[8] Mapper prod-urler til dev-urler basert på [url-lookup-table](https://github.com/navikt/nav-dekoratoren-moduler/blob/master/src/csr/url-lookup-table/table.ts). <br>
[9] Dersom denne er satt vil dekoratørens utloggingsfunksjonalitet forbigåes, og **alt rundt utlogging må håndteres av appen.** <br>
[10] Setter `data-hj-suppress` på HTML-elementet, som hindrer Hotjar fra å fange noe innhold på siden. Default er `true`, dersom denne settes til `false` må appen selv sørge for at elementer med
personinfo eller annen sensitiv data maskeres på tilsvarende måte. Se [hotjar docs](https://help.hotjar.com/hc/en-us/articles/115012439167-How-to-Suppress-Text-Images-and-User-Input-from-Collected-Data).
Dekoratørens egne sensitive elementer maskeres uavhengig av dette parameteret. Denne kan **ikke** endres client-side.

Dersom ikke noe annet er nevnt, kan samtlige parametre settes [client-side](https://github.com/navikt/nav-dekoratoren-moduler#readme) <br>

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

## Content Security Policy

Påkrevde CSP-direktiver for dekoratøren serveres på [https://www.nav.no/dekoratoren/api/csp](https://www.nav.no/dekoratoren/api/csp). Se også [csp.ts](https://github.com/navikt/nav-dekoratoren/blob/master/src/csp.ts). <br>

[nav-dekoratoren-moduler](https://github.com/navikt/nav-dekoratoren-moduler) kan benyttes for å generere en CSP-header som er kompatibel med dekoratøren.

## Amplitude-klient

Logging med dekoratørens Amplitude-klient eksponeres via funksjonen `window.dekoratorenAmplitude`. Se [logEventFromApp](https://github.com/navikt/nav-dekoratoren/blob/master/src/utils/analytics/amplitude.ts) for implementasjon. <br>

[nav-dekoratoren-moduler](https://github.com/navikt/nav-dekoratoren-moduler) har en hjelpefunksjon for å benytte denne.

## Oppsett av Task Analytics undersøkelser

Se [nav-dekoratoren-config](https://github.com/navikt/nav-dekoratoren-config)

## Hopplenke til hovedinnhold

Dekoratøren rendrer en hopplenke dersom et element med id'en `maincontent` finnes på siden. Klikk på hopplenken vil sette focus til dette elementet.

For at denne funksjonaliteten skal fungere konsistent, må `maincontent`-elementet inkluderes i HTML'en fra serveren, og elementet må være fokuserbart (f.eks. ved å sette `tabindex="-1"`)

Eksempel:

```html
<main id="maincontent" tabindex="-1">Appens hovedinnhold goes here!</main>
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

### Oppstart via docker-compose

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
      API_DEKORATOREN_URL=http://localhost:8095/nav-dekoratoren-api
      MINSIDE_ARBEIDSGIVER_URL: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/'
      MIN_SIDE_URL: 'https:/www.nav.no/minside'
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

### Manuelt bygg

```
npm run build-dev (for testing lokalt)
npm run build-prod (for produksjon)
```

### Deploy til dev-miljø

Start deploy workflow via Github web-UI: Actions -> Workflows -> Deploy-to-dev -> Run workflow

### Prodsetting

-   Lag en PR til master, og merge inn etter godkjenning
-   Lag en release på master med versjon-bump, beskrivende tittel og oppsummering av endringene dine
-   Publiser release'en for å starte deploy til prod

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
