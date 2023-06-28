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

// eslint-disable-next-line @typescript-eslint/ban-types
type AutocompleteString = string & {};
type EventName = AmplitudeEvent['name'];
type AutocompleteEventName = EventName | AutocompleteString;

function testLogEvent<TName extends AutocompleteEventName>(
    eventName: TName,
    eventData: TName extends EventName ? Extract<AmplitudeEvent, { name: TName }>['properties'] : any,
    origin = 'dekoratoren'
) {
    console.log('Logging this event');
}

testLogEvent('tilbakemelding', {
    kilde: 'footer',
    var: 'yes',
    extraFelt: 'ok',
});

testLogEvent('customEvent', {
    kilde: 'footer',
    var: 'yes',
    extraFelt: 'ok',
});
