type MakeExtendable<T> = Partial<T> & Record<string, unknown>;

type AccordianÅpnet = {
    name: 'accordian åpnet';
    standard: true;
    properties: MakeExtendable<{
        tekst: string;
    }>;
};

type AccordianLukket = {
    name: 'accordian lukket';
    standard: true;
    properties: MakeExtendable<{
        tekst: string;
    }>;
};

type Tilbakemelding = {
    name: 'tilbakemelding';
    properties: MakeExtendable<{
        kilde: string;
        svar: string;
    }>;
};

export type AmplitudeEvent = AccordianÅpnet | AccordianLukket | Tilbakemelding;

function testLogEvent<TName extends AmplitudeEvent['name']>(
    eventName: TName,
    eventData: Extract<AmplitudeEvent, { name: TName }>['properties'],
    origin = 'dekoratoren'
) {
    console.log('Logging this event');
}

testLogEvent('tilbakemelding', {
    kilde: 'footer',
});
