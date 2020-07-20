import { contentEngaged } from './content-engaged';
import amplitude from "amplitude-js";

export const initAmplitude = () => {
    if(amplitude){
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
    } 
    contentEngaged(1, () => {
        logAmplitudeEvent('sidevisning');
    });
};

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
    return new Promise(function (resolve: any) {
        const eventData = data || {};
        eventData.origin = 'dekoratøren';
        eventData.originVersion = 'unknown';

        if(amplitude){
            amplitude.getInstance().logEvent(eventName, eventData, resolve);
        }
    });
}

export enum AmplitudeEvents {
    // Brukes for logging av 'Ja', 'Nei' og 'Rapporter feil og mangler' klikk
    tilbakemeldingGenerell = 'tilbakemelding',
    // Brukes for logging av kategori på feil eller mangel, under 'Rapporter feil og mangler' (Elaborated.tsx)
    tilbakemeldingRapporterKnapp = 'tilbakemelding-rapport',
    // Brukes for logging av kategorier under 'Fant du det du lette etter?' -> 'Nei' (PartialNo.tsx)
    tilbakemeldingNeiKnapp = 'tilbakemelding-nei'

}
