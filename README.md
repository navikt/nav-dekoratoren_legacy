
# Nav-dekoratoren ![nav.no logo](src/ikoner/meny/NavLogoRod.svg)

![Deploy til prod](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-prod/badge.svg)
![Deploy til q0](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-q0/badge.svg)
![Deploy til q1](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-q1/badge.svg)
![Deploy til q6](https://github.com/navikt/nav-dekoratoren/workflows/Deploy-to-q6/badge.svg)
                     
Node.js Express applikasjon med frontend-komponenter i React.<br>
Appen kjører på NAIS i en docker-container.

## Bruk av dekoratøren

:information_source: &nbsp; Dekoratøren er bakoverkompatibel; med andre ord vil eksisterende applikasjoner som benytter dekoratør:v4 (https://appres.nav.no/common-html/v4/navno) automatisk få ny dekoratør. 

Den nye dekoratøren serveres på følgende ingresser:

**Prod (prod-sbs)**
- https://www.nav.no/dekoratoren/ 
- https://appres.nav.no/common-html/v4/navno (deprecated)

**Dev (dev-gcp)**
- https://dekoratoren.dev.nav.no/

Krever følgende access policy i nais.yaml:
```
accessPolicy:
  outbound:
    external:
      - host: dekoratoren.dev.nav.no
```
**Dev (dev-sbs)**
- [https://www-{q0,q1,q6}.nav.no/dekoratoren/](https://www-q1.nav.no/dekoratoren/) (deprecated)
- [https://appres-{q0,q1,q6}.nav.no/common-html/v4/navno](https://appres-q1.nav.no/common-html/v4/navno) (deprecated)

:warning: &nbsp; Det er en del av it-strategien til NAV å flytte bort fra fra egne datasentre. Som følger vil **dev-sbs og prod-sbs skrus av på et tidspunkt** og det anbefales å deployere nye applikasjoner til Google Cloud (gcp).

## Implementasjon
Dekoratøren kan implementeres på flere ulike måter, både server-side og client-side.

### Eksempel 1
Hent dekoratøren server-side og send html til brukeren som inkluderer dekoratøren:
```
const url = `{MILJO_URL}/?{DINE_PARAMETERE}`;
const getDecorator = () =>x
    request(url, (error, response, body) => {
        // Inject fragmenter av dekoratøren med id-selectors, enten manuelt eller ved bruk av template engine
    });
```
Vis [implementasjon](https://github.com/navikt/personopplysninger/blob/master/server/dekorator.js) i Personopplysninger.<br>
:warning: &nbsp; Cache anbefales.

### Eksempel 2

Sett inn noen linjer html og last inn dekoratøren client-side:
```
<html>
  <head>
      <link href="{MILJO_URL}/css/client.css" rel="stylesheet" /> 
  </head>
  <body>
    <section id="decorator-header" class="navno-dekorator"></section>
    {
      DIN_APP
    }
    <section id="decorator-footer" class="navno-dekorator"></section>
    <div id="decorator-env" data-src="{MILJO_URL}/env?{DINE_PARAMETERE}"></div>
    <script type="text/javascript" src="{MILJO_URL}/client.js"></script>
  </body>
</html>
```

:warning: &nbsp; CSR (Client-Side-Rendering) av dekoratøren **kan påvirke ytelsen**.

### Eksempel 3
Bruk pus-decorator, les [readme](https://github.com/navikt/pus-decorator).

## Parametere
Dekoratøren kan tilpasses med følgende [URL-parametere / query-string](https://en.wikipedia.org/wiki/Query_string). <br>

| Parameter         | Type                                                    | Default              | Forklaring                                                          |
| ----------------- |---------------------------------------------------------|----------------------| --------------------------------------------------------------------|
| context           | privatperson \| arbeidsgiver \| samarbeidspartner       | privatperson         | Setter menyen til valgt context                                     |
| simple            | boolean                                                 | false                | Forenklet header og footer                                          |
| redirectToApp     | boolean                                                 | false <br>(ditt-nav) | Redirecter brukeren til app etter innlogging fra dekoratøren.       |
| level             | Level3 \| Level4                                        | Level3               | Krever innlogging basert på definert sikkerhetsnivå                 |
| language          | norsk \| engelsk \| samisk                              | norsk                | Setter språket til dekoratøren                                      |
| feedback          | boolean                                                 | true                 | Skjuler eller viser tilbakemeldingskomponentet                      |
| chatbot           | boolean                                                 | false                | Skjuler eller viser Chatbot Frida [1]    

Eksempel:<br>
https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level3

[1] Dersom en chat-sesjon er aktiv, så vil denne holdes i gang på alle sider på nav.no, uavhengig av dette parameteret.

## Oppstart via docker-compose

Start **navikt/nav-dekoratoren**, **navikt/pb-nav-mocked**, **navikt/stub-oidc-provider** og **navikt/pb-oidc-provider-gui**. Oppsettet vil replikere innlogging og eksterne avhengigheter som varselinnboks.
```
dekoratoren:
    container_name: dekoratoren
    image: "navikt/nav-dekoratoren:latest"
    ports:
      - "8100:8088"
    environment:
      XP_BASE_URL: 'https://www.nav.no'
      APP_BASE_URL: "http://localhost:8100/dekoratoren"
      API_XP_SERVICES_URL: 'https://www.nav.no/_/service'
      API_UNLEASH_PROXY_URL=https://www.nav.no/person/pb-unleash-proxy
      API_INNLOGGINGSLINJE_URL: 'http://mocks:8080/innloggingslinje-api/auth'
      API_VARSELINNBOKS_URL: 'http://mocks:8080/person/varselinnboks'
      MINSIDE_ARBEIDSGIVER_URL: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/'
      DITT_NAV_URL: 'https:/www.nav.no/person/dittnav/'
      LOGIN_URL: 'http://localhost:5000'
      LOGOUT_URL: 'http://localhost:5000/?logout'
    depends_on:
      - mocks
```
[Eksempel i Enonic XP](https://github.com/navikt/nav-enonicxp/blob/IV-843-decorator/docker-compose.yml).

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
npm run build (for produksjon)
```

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
