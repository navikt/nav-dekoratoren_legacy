import { finnEmail } from './validators/EmailValidator';
import { finnFnr } from './validators/FodselsnummerValidator';
import { finnTelefonNummer } from './validators/TelefonValidator';
import { Locale } from '../../../../../store/reducers/language-duck';
import { finnTekst } from '../../../../../tekster/finn-tekst';

export enum Violation {
    EMAIL = 'EMAIL',
    FNR = 'FNR',
    TLF = 'TLF',
}

export interface Violations {
    type: Violation;
    value: string;
}

export const getViolationErrorMessage = (violations: Violations[], language: Locale): string => {
    if (!violations.length) {
        return '';
    }

    let pronomen = '';
    if (violations.length > 1) {
        pronomen = finnTekst('personvern-pronomen-flertall', language);
    } else if (violations.length === 1 && violations[0].type === Violation.EMAIL) {
        pronomen = finnTekst('personvern-pronomen-email', language);
    } else {
        pronomen = finnTekst('personvern-pronomen', language);
    }

    const violationStringArray = violations.map((violation) => {
        switch (violation.type) {
            case Violation.EMAIL:
                return finnTekst('violation-email', language) + ` ( ${violation.value} )`;
            case Violation.TLF:
                return finnTekst('violation-tlf', language) + ` ( ${violation.value} )`;
            case Violation.FNR:
                return finnTekst('violation-fnr', language) + ` ( ${violation.value} )`;
            default:
                return '';
        }
    });

    let violationString = '';
    if (violationStringArray.length === 1) {
        violationString = violationStringArray[0];
    } else {
        const commaSeparated = violationStringArray.join(', ');
        const index = commaSeparated.lastIndexOf(',');
        violationString =
            commaSeparated.substring(0, index) +
            ` ${finnTekst('bindeord', language)} ` +
            commaSeparated.substring(index + 1);
    }

    const errorMessage =
        finnTekst('personvern-feilmelding', language, violationString) +
        finnTekst('personvern-feilmelding-2', language, pronomen);

    return errorMessage;
};

export const checkForViolations = (text: string) => {
    const violations = [];
    const email = finnEmail(text);
    if (email) {
        violations.push({ type: Violation.EMAIL, value: email });
    }

    const fnr = finnFnr(text);

    if (fnr) {
        violations.push({ type: Violation.FNR, value: fnr });
    }

    // Fjern fnr fra søketeksten for telefonnummer så man ikke får treff på samme tall
    const tlf = finnTelefonNummer(fnr ? text.replace(fnr, '') : text);
    if (tlf) {
        violations.push({ type: Violation.TLF, value: tlf });
    }

    return violations;
};
