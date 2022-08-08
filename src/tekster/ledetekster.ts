export type stringOrFunction = string | ((input: string) => string);

export const ledetekster: { [key: string]: stringOrFunction } = {
    'footer-arbeids-og-veldferdsetaten': 'Arbeids- og velferdsetaten',
    'footer-arbeids-og-veldferdsetaten-en': 'Arbeids- og velferdsetaten',
    'footer-arbeids-og-veldferdsetaten-se': 'Arbeids- og velferdsetaten',
    'footer-languages-overskrift': 'Andre språk',
    'footer-languages-overskrift-en': 'Other languages',
    'footer-languages-overskrift-se': 'Andre språk',
    'footer-kontakt-overskrift': 'Kontakt',
    'footer-kontakt-overskrift-en': 'Contact',
    'footer-kontakt-overskrift-se': 'Kontakt',
    'footer-navsamfunn-overskrift': 'NAV og samfunn',
    'footer-navsamfunn-overskrift-en': 'NAV og samfunn',
    'footer-navsamfunn-overskrift-se': 'NAV og samfunn',
    'footer-del-skjerm': 'Del skjerm med veileder',
    'footer-del-skjerm-en': 'Share screen with your counsellor',
    'footer-del-skjerm-se': 'Del skjerm med veileder',
    'footer-til-toppen': 'Til toppen',
    'footer-til-toppen-en': 'To the top',
    'footer-til-toppen-se': 'Til toppen',
    'til-forsiden': 'Til forsiden',
    'til-forsiden-en': 'To the frontpage',
    'til-forsiden-se': 'Til forsiden',
    'til-dittnav-forside': 'Til forsiden av Ditt NAV',
    'til-dittnav-forside-en': 'To front of My page',
    'til-dittnav-forside-se': 'Til forsiden av Ditt NAV',
    'min-side-arbeidsgiver': 'Min side arbeidsgiver',
    'min-side-arbeidsgiver-en': 'Min side arbeidsgiver',
    'min-side-arbeidsgiver-se': 'Min side arbeidsgiver',
    'ga-til-min-side-arbeidsgiver': 'Gå til Min side',
    'ga-til-min-side-arbeidsgiver-en': 'Gå til Min side',
    'ga-til-min-side-arbeidsgiver-se': 'Gå til Min side',
    'logg-inn-knapp': 'Logg inn',
    'logg-inn-knapp-en': 'Log in',
    'logg-inn-knapp-se': 'Sisačáliheapmi',
    'logg-ut-knapp': 'Logg ut',
    'logg-ut-knapp-en': 'Log out',
    'logg-ut-knapp-se': 'Olggosčáliheapmi',
    'logg-inn-loader': 'Laster',
    'logg-inn-loader-en': 'Loading',
    'logg-inn-loader-se': 'Laster',
    'logo-title': 'Hjem',
    'logo-title-en': 'Hjem',
    'logo-title-se': 'Hjem',
    'logget-inn-som': 'Logget inn:',
    'logget-inn-som-en': 'Signed in:',
    'logget-inn-som-se': 'Logget inn:',
    lukk: 'Lukk',
    'lukk-en': 'Close',
    'lukk-se': 'Lukk',
    'meny-knapp': 'Meny',
    'meny-knapp-en': 'Menu',
    'meny-knapp-se': 'Fállu',
    'meny-knapp-aria-label': 'Menyknapp',
    'meny-knapp-aria-label-en': 'Menu button',
    'meny-knapp-aria-label-se': 'Menyknapp',
    'meny-slideout-ingress': 'I hvilken situasjon er du i?',
    'meny-slideout-ingress-en': 'Choose your current situation',
    'meny-slideout-ingress-se': 'Válljet dilálašvuohta',
    'min-side': 'Ditt NAV',
    'min-side-en': 'My page',
    'min-side-se': 'Ditt NAV',
    'min-side-login': 'Logg inn på Ditt NAV',
    'min-side-login-en': 'Login to My page',
    'min-side-login-se': 'Logg inn på Ditt NAV',
    'pa-min-side-finner-du': 'På Min side finner du:',
    'pa-min-side-finner-du-en': 'On My page you will find:',
    'pa-min-side-finner-du-se': 'På Min side finner du:',
    'samisk-samegiella': 'SÁMEGIELLA',
    'samisk-samegiella-en': 'SÁMEGIELLA',
    'samisk-samegiella-se': 'SÁMEGIELLA',
    'skiplinks-ga-til-hovedmeny': 'Hopp til hovedmeny',
    'skiplinks-ga-til-hovedmeny-en': 'Jump to main menu',
    'skiplinks-ga-til-hovedmeny-se': 'Hopp til hovedmeny',
    'skiplinks-ga-til-sok': 'Hopp til søk',
    'skiplinks-ga-til-sok-en': 'Jump to search',
    'skiplinks-ga-til-sok-se': 'Hopp til søk',
    'skiplinks-ga-til-hovedinnhold': 'Hopp til hovedinnhold',
    'skiplinks-ga-til-hovedinnhold-en': 'Jump to main content',
    'skiplinks-ga-til-hovedinnhold-se': 'Hopp til hovedinnhold',
    'sok-mobil-knapp': 'Søk',
    'sok-mobil-knapp-en': 'Search',
    'sok-mobil-knapp-se': 'Oza',
    'sok-knapp': 'Søk',
    'sok-knapp-en': 'Search',
    'sok-knapp-se': 'Oza',
    'sok-reset': 'Tøm',
    'sok-reset-en': 'Reset',
    'sok-reset-se': 'Tøm',
    'sok-knapp-sokefelt': 'Søk på nav.no',
    'sok-knapp-sokefelt-en': 'Search nav.no',
    'sok-knapp-sokefelt-se': 'Oza nav.no',
    'sok-input-label': 'Søk',
    'sok-input-label-en': 'Search',
    'sok-input-label-se': 'Ohcat',
    'sok-ingen-treff': 'Ingen treff for',
    'sok-ingen-treff-en': 'No hits for',
    'sok-ingen-treff-se': 'Ingen treff for',
    'sok-viser': 'Viser',
    'sok-viser-en': 'Showing',
    'sok-viser-se': 'Viser',
    'sok-av': 'av',
    'sok-av-en': 'of',
    'sok-av-se': 'av',
    'sok-resultater': 'resultater',
    'sok-resultater-en': 'result',
    'sok-resultater-se': 'resultater',
    'se-alle-treff': 'Se alle treff',
    'se-alle-treff-en': 'See all hits',
    'se-alle-treff-se': 'Se alle treff',
    'tilbake-til-overskrift': 'Tilbake til oversikt',
    'tilbake-til-overskrift-en': 'Back to menu',
    'tilbake-til-overskrift-se': 'Tilbake til oversikt',
    // Todo: Oversett til samisk
    'delskjerm-modal-overskrift': 'Del skjermen din med NAV',
    'delskjerm-modal-overskrift-en': 'Share your screen with NAV',
    'delskjerm-modal-overskrift-se': 'Del skjermen din med NAV',
    'delskjerm-modal-beskrivelse': `Gi veilederen du snakker med på telefon tilgang til å se det du ser på nav.no.`,
    'delskjerm-modal-beskrivelse-en': `Give the counsellor access to see the same content as you on nav.no`,
    'delskjerm-modal-beskrivelse-se': `Gi veilederen du snakker med på telefon tilgang til å se det du ser på nav.no.`,
    'delskjerm-modal-hjelpetekst-overskrift': `Hva er skjermdeling?`,
    'delskjerm-modal-hjelpetekst-overskrift-en': `What is screen sharing?`,
    'delskjerm-modal-hjelpetekst-overskrift-se': `Hva er skjermdeling?`,
    'delskjerm-modal-hjelpetekst-0': `Når du deler skjerm med NAV kontaktsenter kan veilederen hjelpe deg med å finne fram på nav.no.`,
    'delskjerm-modal-hjelpetekst-0-en': `When you share your screen, the counsellor can help you navigate nav.no`,
    'delskjerm-modal-hjelpetekst-0-se': `Når du deler skjerm med NAV kontaktsenter kan veilederen hjelpe deg med å finne fram på nav.no.`,
    'delskjerm-modal-hjelpetekst-1': `Veilederen ser kun det du ser på nav.no og kan ikke fylle inn opplysninger eller sende inn noe på dine vegne. `,
    'delskjerm-modal-hjelpetekst-1-en': `The counsellor can only see what you see on nav.no and can't fill in any information or send anything on your behalf.`,
    'delskjerm-modal-hjelpetekst-1-se': `Veilederen ser kun det du ser på nav.no og kan ikke fylle inn opplysninger eller sende inn noe på dine vegne. `,
    'delskjerm-modal-hjelpetekst-2': `Det er du som godkjenner skjermdeling. Ingenting blir lagret.`,
    'delskjerm-modal-hjelpetekst-2-en': `Screen sharing must be approved by you. Nothing is stored.`,
    'delskjerm-modal-hjelpetekst-2-se': `Det er du som godkjenner skjermdeling. Ingenting blir lagret.`,
    'delskjerm-modal-feilmelding': `Må bestå av 5 siffer`,
    'delskjerm-modal-feilmelding-en': `Must be 5 digits`,
    'delskjerm-modal-feilmelding-se': `Må bestå av 5 siffer`,
    'delskjerm-modal-label': `Skriv inn koden du får fra veilederen`,
    'delskjerm-modal-label-en': `Enter the code you received from the counsellor`,
    'delskjerm-modal-label-se': `Skriv inn koden du får fra veilederen`,
    'delskjerm-modal-start': `Start skjermdeling`,
    'delskjerm-modal-start-en': `Start screen sharing`,
    'delskjerm-modal-start-se': `Start skjermdeling`,
    'delskjerm-modal-avbryt': `Avbryt`,
    'delskjerm-modal-avbryt-en': `Cancel`,
    'delskjerm-modal-avbryt-se': `Avbryt`,
    'delskjerm-modal-stengt': 'Skjermdeling er for øyeblikket stengt, prøv igjen senere',
    'delskjerm-modal-stengt-en': 'Screen sharing is currently closed, please try again later',
    'delskjerm-modal-stengt-se': 'Skjermdeling er for øyeblikket stengt, prøv igjen senere',
    'varsler-visalle': 'Tidligere varsler',
    'varsler-visalle-en': 'Previous notifications',
    'varsler-visalle-se': 'Tidligere varsler',
    'varsler-tittel': 'Varsler',
    'varsler-tittel-en': 'Notifications',
    'varsler-tittel-se': 'Varsler',
    'varsler-lukk-knapp': 'Lukk varsler',
    'varsler-lukk-knapp-en': 'Close notifications',
    'varsler-lukk-knapp-se': 'Lukk varsler',
    'varsler-mobil': 'Varsler',
    'varsler-mobil-en': 'Notifications',
    'varsler-mobil-se': 'Varsler',
    'varsler-mobil-lukk': 'Lukk',
    'varsler-mobil-lukk-en': 'Close',
    'varsler-mobil-lukk-se': 'Lukk',
    'varsler-tom-liste': 'Du har ingen varsler',
    'varsler-tom-liste-en': `You have no notifications`,
    'varsler-tom-liste-se': `Du har ingen varsler`,
    'varsler-vis-5-siste': 'Vis 5 siste varsel',
    'varsler-vis-5-siste-en': `Show last 5 notifications`,
    'varsler-vis-5-siste-se': `Vis 5 siste varsel`,
    'rolle-privatperson': 'Privat',
    'rolle-privatperson-en': 'Privat',
    'rolle-privatperson-se': 'Privat',
    'rolle-arbeidsgiver': 'Arbeidsgiver',
    'rolle-arbeidsgiver-en': 'Employer',
    'rolle-arbeidsgiver-se': 'Arbeidsgiver',
    'rolle-samarbeidspartner': 'Samarbeidspartner',
    'rolle-samarbeidspartner-en': 'Collaborator',
    'rolle-samarbeidspartner-se': 'Samarbeidspartner',
    'arbeidsgiver-minside-lenke': 'Min side - arbeidsgiver',
    'arbeidsgiver-minside-lenke-en': 'Min side - arbeidsgiver',
    'arbeidsgiver-minside-lenke-se': 'Min side - arbeidsgiver',
    'samarbeidspartner-side-lenke': 'Samarbeidspartner',
    'samarbeidspartner-side-lenke-en': 'Samarbeidspartner',
    'samarbeidspartner-side-lenke-se': 'Samarbeidspartner',
    'meny-bunnlenke-minside-stikkord':
        'Dine saker, utbetalinger, meldinger, meldekort, aktivitetsplan, personopplysninger og flere tjenester',
    'meny-bunnlenke-minside-stikkord-en':
        'Dine saker, utbetalinger, meldinger, meldekort, aktivitetsplan, personopplysninger og flere tjenester',
    'meny-bunnlenke-minside-stikkord-se':
        'Dine saker, utbetalinger, meldinger, meldekort, aktivitetsplan, personopplysninger og flere tjenester',
    'meny-bunnlenke-arbeidsgiver-stikkord': 'Dine sykmeldte, rekruttering, digitale skjemaer',
    'meny-bunnlenke-arbeidsgiver-stikkord-en': 'Dine sykmeldte, rekruttering, digitale skjemaer',
    'meny-bunnlenke-arbeidsgiver-stikkord-se': 'Dine sykmeldte, rekruttering, digitale skjemaer',
    'meny-bunnlenke-samarbeidspartner-stikkord': 'Helsepersonell, tiltaksarrangører, fylker og kommuner',
    'meny-bunnlenke-samarbeidspartner-stikkord-en': 'Helsepersonell, tiltaksarrangører, fylker og kommuner',
    'meny-bunnlenke-samarbeidspartner-stikkord-se': 'Helsepersonell, tiltaksarrangører, fylker og kommuner',
    'meny-loading': 'Laster innhold...',
    'meny-loading-en': 'Loading menu content...',
    'meny-loading-se': 'Laster innhold...',
    'arbeidsflate-stikkord-om-privatperson':
        'Arbeidssøker, syk, foreldre og barn, pensjon, hjelpemidler, sosiale tjenester, internasjonalt',
    'arbeidsflate-stikkord-om-privatperson-en':
        'Arbeidssøker, syk, foreldre og barn, pensjon, hjelpemidler, sosiale tjenester, internasjonalt',
    'arbeidsflate-stikkord-om-privatperson-se':
        'Arbeidssøker, syk, foreldre og barn, pensjon, hjelpemidler, sosiale tjenester, internasjonalt',
    'arbeidsflate-stikkord-om-arbeidsgiver':
        'Tjenester, skjemaer, rekruttere, inkludere, sykmeldte, selvstendig næringsdrivende',
    'arbeidsflate-stikkord-om-arbeidsgiver-en':
        'Tjenester, skjemaer, rekruttere, inkludere, sykmeldte, selvstendig næringsdrivende',
    'arbeidsflate-stikkord-om-arbeidsgiver-se':
        'Tjenester, skjemaer, rekruttere, inkludere, sykmeldte, selvstendig næringsdrivende',
    'arbeidsflate-stikkord-om-samarbeidspartner': 'Helsepersonell, tiltaksarrangører, fylker og kommuner',
    'arbeidsflate-stikkord-om-samarbeidspartner-en': 'Helsepersonell, tiltaksarrangører, fylker og kommuner',
    'arbeidsflate-stikkord-om-samarbeidspartner-se': 'Helsepersonell, tiltaksarrangører, fylker og kommuner',
    'lock-msg-infotekst':
        'Menypunkt med hengelås sender deg til ny innlogging. Disse tjenestene krever BankID, Buypass eller Commfides.',
    'lock-msg-infotekst-en':
        'Menu items with padlock sends you to a new login. These services require BankID, Buypass or Commfides.',
    'lock-msg-infotekst-se':
        'Menypunkt med hengelås sender deg til ny innlogging. Disse tjenestene krever BankID, Buypass eller Commfides.',
    'feil-sok-fetch': 'Feil mot søketjeneste.',
    'feil-sok-fetch-en': 'Search system malfunction.',
    'feil-sok-fetch-se': 'Feil mot søketjeneste.',
    'spinner-sok': 'Laster forhåndsvisning...',
    'spinner-sok-en': 'Loading search preview...',
    'spinner-sok-se': 'Laster forhåndsvisning...',

    // Feedback
    'fant-du-det-du-lette-etter': 'Fant du det du lette etter?',
    'fant-du-det-du-lette-etter-en': 'Did you find what you were looking for?',
    'fant-du-det-du-lette-etter-se': 'Fant du det du lette etter?',
    'svarknapp-ja': 'Ja',
    'svarknapp-ja-en': 'Yes',
    'svarknapp-ja-se': 'Ja',
    'svarknapp-nei': 'Nei',
    'svarknapp-nei-en': 'No',
    'svarknapp-nei-se': 'Nei',
    'hva-lette-du-etter': 'Hva lette du etter? Svaret ditt hjelper oss med å gjøre nettstedet bedre.',
    'hva-lette-du-etter-en': 'What were you looking for? Your answer helps us make the website better.',
    'hva-lette-du-etter-se': 'Hva lette du etter? Svaret ditt hjelper oss med å gjøre nettstedet bedre.',
    'advarsel-om-personopplysninger':
        'Vi svarer ikke på tilbakemeldingen. Ikke send personlig informasjon som telefonnummer, fødselsnummer eller e-postadresse.',
    'advarsel-om-personopplysninger-en':
        'We don’t answer feedback given here. Don’t write personal information such as phone number, national identity number or e-mail address.',
    'advarsel-om-personopplysninger-se':
        'Vi svarer ikke på tilbakemeldingen. Ikke send personlig informasjon som telefonnummer, fødselsnummer eller e-postadresse.',
    'textarea-undermaks': (input: string) => `Du har ${input} tegn igjen`,
    'textarea-undermaks-en': (input: string) => `You have ${input} characters left`,
    'textarea-undermaks-se': (input: string) => `Du har ${input} tegn igjen`,
    'textarea-overmaks': (input: string) => `Du har ${input} tegn for mye`,
    'textarea-overmaks-en': (input: string) => `You have ${input} characters too many`,
    'textarea-overmaks-se': (input: string) => `Du har ${input} tegn for mye`,
    'textarea-feilmelding': (input: string) => `Du kan ikke skrive mer enn ${input} tegn`,
    'textarea-feilmelding-en': (input: string) => `You can't write more than ${input} characters`,
    'textarea-feilmelding-se': (input: string) => `Du kan ikke skrive mer enn ${input} tegn`,
    'personvern-feilmelding': (input: string) => `Det ser ut som du har skrevet inn ${input}. `,
    'personvern-feilmelding-2': (input: string) => `Du må fjerne ${input} før du går videre. `,
    'personvern-feilmelding-en': (input: string) => `It looks like you have typed ${input}. `,
    'personvern-feilmelding-2-en': (input: string) => `You have to remove ${input} before sending your feedback. `,
    'personvern-feilmelding-se': (input: string) => `Det ser ut som du har skrevet inn ${input}. `,
    'personvern-feilmelding-2-se': (input: string) => `Du må fjerne ${input} før du går videre. `,
    'violation-fnr': 'et fødselsnummer',
    'violation-fnr-en': 'a national identity number',
    'violation-fnr-se': 'et fødselsnummer',
    'violation-tlf': 'et telefonnummer',
    'violation-tlf-en': 'a phone number',
    'violation-tlf-se': 'et telefonnummer',
    'violation-email': 'en e-postadresse',
    'violation-email-en': 'an email address',
    'violation-email-se': 'en e-postadresse',
    bindeord: 'og',
    'bindeord-en': 'and',
    'bindeord-se': 'og',
    'personvern-pronomen-email': 'denne',
    'personvern-pronomen-email-en': 'this',
    'personvern-pronomen-email-se': 'denne',
    'personvern-pronomen': 'dette',
    'personvern-pronomen-en': 'this',
    'personvern-pronomen-se': 'dette',
    'personvern-pronomen-flertall': 'disse',
    'personvern-pronomen-flertall-en': 'these',
    'personvern-pronomen-flertall-se': 'disse',
    'send-inn-tilbakemelding': 'Send svar',
    'send-inn-tilbakemelding-en': 'Send',
    'send-inn-tilbakemelding-se': 'Send svar',
    'avbryt-tilbakemelding': 'Avbryt',
    'avbryt-tilbakemelding-en': 'Cancel',
    'avbryt-tilbakemelding-se': 'Avbryt',
    'send-undersokelse-takk': 'Takk!',
    'send-undersokelse-takk-en': 'Thanks!',
    'send-undersokelse-takk-se': 'Takk!',
    'hensikt-med-tilbakemelding':
        'Du får dessverre ikke svar på tilbakemeldingen din. Har du spørsmål eller trenger du hjelp?',
    'hensikt-med-tilbakemelding-en':
        'Unfortunately you will not get a reply to your feedback. Do you have questions or need help?',
    'hensikt-med-tilbakemelding-se':
        'Du får dessverre ikke svar på tilbakemeldingen din. Har du spørsmål eller trenger du hjelp?',
    'hensikt-med-tilbakemelding-lenke': 'Ring, chat eller skriv til oss',
    'hensikt-med-tilbakemelding-lenke-en': 'Call, chat or write to us',
    'hensikt-med-tilbakemelding-lenke-se': 'Ring, chat eller skriv til oss',
    annet: 'Annet',
    'annet-en': 'Other',
    'annet-se': 'Annet',

    'browser-utdatert-msg': 'Du bruker en nettleser som nav.no ikke støtter. ',
    'browser-utdatert-msg-en': 'You are using a web browser which is not supported on nav.no. ',
    'browser-utdatert-msg-se': 'Du bruker en nettleser som nav.no ikke støtter. ',
    'browser-utdatert-lenke': 'Se mer informasjon',
    'browser-utdatert-lenke-en': 'More information',
    'browser-utdatert-lenke-se': 'Se mer informasjon',
    'browser-utdatert-din-nettleser': 'Din nettleser: ',
    'browser-utdatert-din-nettleser-en': 'Your web browser: ',
    'browser-utdatert-din-nettleser-se': 'Din nettleser: ',
    brodsmulesti: 'Brødsmulesti',
    'brodsmulesti-en': 'Breadcrumbs',
    'brodsmulesti-se': 'Brødsmulesti',
    'brodsmulesti-se-alle': 'Se hele brødsmulestien',
    'brodsmulesti-se-alle-en': 'View all breadcrumbs',
    'brodsmulesti-se-alle-se': 'Se hele brødsmulestien',
    'how-can-we-help': 'Hva kan vi hjelpe deg med?',
    'how-can-we-help-en': 'What can we help you with?',
    'how-can-we-help-se': 'Hva kan vi hjelpe deg med?',
};
