
# Nav-dekoratoren ![nav.no logo](./src/ikoner/meny/NavLogo.svg) [![CircleCI](https://circleci.com/gh/navikt/nav-dekoratoren.svg?style=svg)](https://circleci.com/gh/navikt/nav-dekoratoren)
                     
:warning: **OBS! Denne versjonen av header og footer er under arbeid. Kan ikke prodsettes.**

Node.js Express applikasjon med frontend-komponenter i React.<br>
Appen kjører på NAIS i en docker-container.


## Kom i gang
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
npm run build (for produksjon)
```

## Miljø på NAIS

Dekoratøren ligger i  [Q6](https://www-q6.nav.no/dekoratoren/), [Q1](https://www-q1.nav.no/dekoratoren/), [Q0](https://www-q0.nav.no/dekoratoren/) og [Prod](https://www.nav.no/dekoratoren/).<br>

## Parametere
Dekoratøren kan tilpasses med følgende [URL-parametere / query-string](https://en.wikipedia.org/wiki/Query_string). <br>

| Parameter         | Type                                                    | Default              | Forklaring                                                          |
| ----------------- |---------------------------------------------------------|----------------------| --------------------------------------------------------------------|
| context           | privatperson \| arbeidsgiver \| samarbeidspartner       | privatperson         | Setter menyen til valgt context                                     |
| simple            | boolean                                                 | false                | Forenklet header og footer                                          |
| redirectToApp     | boolean                                                 | false <br>(ditt-nav) | Redirecter brukeren til app etter innlogging fra dekoratøren.       |
| level             | Level3 \| Level4                                        | Level4               | Krever innlogging basert på definert sikkerhetsnivå                 |

Eksempel:<br>
[https://www-q6.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level3](https://www-q6.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level3)

## Bruk av dekoratøren

Dekoratøren er bakoverkompatibel, slik at eksisterende applikasjoner som benytter dekoratør/:v4 kun endrer URL fra https://appres.nav.no/.... til https://www.nav.no/dekoratoren.

Nye applikasjoner kan implementere menyen som følger: 

### Eksempel 1
Hent dekoratøren server-side:
```
const url = 'http://<test-mijø | prod-adr>/dekoratoren?{DINE_PARAMETERE}';
const getDecorator = () =>x
    request(url, (error, response, body) => {
        // Inject fragmenter av dekoratøren med id-selectors, enten manuelt eller ved bruk av template engine
    });
```
Vis [implementasjon](https://github.com/navikt/personopplysninger/blob/master/server/dekorator.js) i Personopplysninger.<br>
**Obs:** Cache anbefales

### Eksempel 2
Sett inn 5 linjer HTML:
```
<html>
  <head>
      <link href=http://<miljø adresse>/dekoratoren/css/client.css rel="stylesheet" /> 
  </head>
  <body>
    <section id="decorator-header" class="navno-dekorator" role="main"></section>
    {
      DIN_APP
    }
    <section id="decorator-footer" class="navno-dekorator" role="main"></section>
    <div id="decorator-env" data-src="<miljø adresse>/dekoratoren/env?{DINE_PARAMETERE}"></div>
    <script type="text/javascript" src="<miljø adresse>/dekoratoren/client.js"></script>
  </body>
</html>
```
**Obs:** Faviconer vil ikke bli importert automatisk som i **Eksempel 1**.

### Eksempel 3
Bruk av pus-decorator:<br>
I app-config.yaml, bytt ut fasitResources til å peke på ny dekoratør

Fra:
```
fasitResources:
  used:
  - alias: appres.cms
    resourceType: baseUrl
```

Til:
```
fasitResources:
  used:
  - alias: nav.dekoratoren (denne peker på https://www{-miljø adresse}.nav.no, pus-decorator legger på path /dekoratoren)
    resourceType: baseUrl
```
For komplett oppsett se: https://github.com/navikt/pus-decorator

Appen blir serverside-rendret. Derfor anbefales det å bruke en .js fil til å fetche innholdet fra 'http://<test-mijø | prod-adr>/dekoratoren', deretter selektere innholdet i id'ene. Selektors som benyttes i dag:
   
      styles            (inneholder css og favicons)
      header-withmenu   (header mounting point)
      footer-withmenu   (footer mounting point)
      scripts           (inneholder javascript)

## Oppstart via docker-compose

Start **navikt/nav-dekoratoren**, **navikt/pb-nav-mocked**, **navikt/stub-oidc-provider** og **navikt/pb-oidc-provider-gui**. Oppsettet vil replikere innlogging og eksterne avhengigheter som varselinnboks.
```
dekoratoren:
    container_name: dekoratoren
    image: "navikt/nav-dekoratoren:latest"
    ports:
      - "8100:8088"
    environment:
      XP_BASE_URL: 'https://www-q1.nav.no'
      APP_BASE_URL: "http://localhost:8100/dekoratoren"
      API_XP_MENY_URL: 'https://www-q1.nav.no/_/service/no.nav.navno/menu'
      API_XP_SOK_URL: 'https://www-q1.nav.no/_/service/navno.nav.no.search/search2/sok'
      API_INNLOGGINGSLINJE_URL: 'http://mocks:8080/innloggingslinje-api/auth'
      API_VARSELINNBOKS_URL: 'http://mocks:8080/person/varselinnboks'
      MINSIDE_ARBEIDSGIVER_URL: 'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/'
      DITT_NAV_URL: 'https:/www.nav.no/person/dittnav/'
      LOGIN_URL: 'http://localhost:5000'
      LOGOUT_URL: 'http://localhost:5000/?logout'
    depends_on:
      - mocks
```
[Eksempel i Enonic XP](https://github.com/navikt/nav-enonicxp/blob/IV-843-decorator/docker-compose.yml).


## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
