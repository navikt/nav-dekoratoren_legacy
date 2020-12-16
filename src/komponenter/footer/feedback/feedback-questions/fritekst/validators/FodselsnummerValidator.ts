import FnrValidator from '@navikt/fnrvalidator';

export const finnFnr = (text: string): string | undefined => {
    // Finn grupper av 11 tall, mulig mellomrom etter første 6 tall
    const foedselsnummer = text.match(/[\d]{6}\s*[\d]{5}/g);

    return foedselsnummer?.find((item) => isValidFnr(item));
};

export const isValidFnr = (text: string): boolean => {
    const fnr = FnrValidator.fnr(text);
    const dnr = FnrValidator.dnr(text);
    const key = 'status';

    return fnr[key] === 'valid' || dnr[key] === 'valid';
};
