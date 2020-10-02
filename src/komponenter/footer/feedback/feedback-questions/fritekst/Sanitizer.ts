import { finnEmail } from './validators/EmailValidator';
import { finnFnr } from './validators/FodselsnummerValidator';
import { finnTelefonNummer } from './validators/TelefonValidator';

export const getViolationsFormatted = (violations: string[]): string => {
    if (!violations.length) {
        return '';
    }
    if (violations.length === 1) {
        return violations[0];
    }

    const commaSeparated =  violations.join(', ');
    const index = commaSeparated.lastIndexOf(',')
    return commaSeparated.substring(0, index) + ' og ' + commaSeparated.substring(index + 1);
}

export const checkForViolations = (text: string) => {
    const violations = [];
    const email = finnEmail(text);
    if (email) {
        violations.push(`en e-postadresse ( ${email} )`)
    }

    const fnr = finnFnr(text);
    if (fnr) {
        violations.push(`et fødselsnummer ( ${fnr} )`)
    }

    const tlf = finnTelefonNummer(text);
    if (tlf && tlf !== fnr) {
        violations.push(`et telefonnummer ( ${tlf} )`)
    }

    return violations;
}
