export enum amplitudeTriggers {
    // Brukes for logging av kategori på feil eller mangel, under 'Rapporter feil og mangler' (AlternativFeilMangler.tsx)
    rapporterKnapp = 'tilbakemelding-rapport',

    // Brukes for logging av kategorier under 'Fant du det du lette etter?' -> 'Nei' (AlternativNei.tsx)
    neiKnapp = 'tilbakemelding-nei',

    // Brukes for logging av 'Ja', 'Nei' og 'Rapporter feil og mangler' klikk
    felles = 'tilbakemelding',
}

export default amplitudeTriggers;
