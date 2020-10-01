import { EmailValidator } from './validators/EmailValidator';
import { FodselsnummerValidator } from './validators/FodselsnummerValidator';
import { finnTelefonNummer } from './validators/TelefonValidator';

/*
Tar inn fritekst og finner ut om den inneholder enten en e-postadresse/fødselsnummer/telefonnummer
*/
export class Filter {
    violations: string[]
    emailValidator: EmailValidator;
    fodselsnummerValidator: FodselsnummerValidator;

    constructor(initialViolations: string[]) {
        this.violations = initialViolations;
        this.emailValidator = new EmailValidator();
        this.fodselsnummerValidator = new FodselsnummerValidator();
    }

    /* Legg til en overtredelse hvis den ikke finnes fra før */
    addViolation(violation: string) {
        if (!this.violations.includes(violation)) {
            this.violations.push(violation)
        }
    }

    getViolationsFormatted(): string {
        if (!this.violations.length) {
            return '';
        }
        if (this.violations.length === 1) {
            return this.violations[0];
        }

        const commaSeparated =  this.violations.join(', ');
        const index = commaSeparated.lastIndexOf(',')
        return commaSeparated.substring(0, index) + ' og ' + commaSeparated.substring(index + 1);
    }

    checkForViolations(text: string): void {

        // 11 digits, possible whitespace after first 6 digits.
        const foedselsnummer = text.match(/[\d]{6}\s*[\d]{5}/g)
        const strings = text.match(/[.\S]+/g); // any character except whitespace

        const email = strings?.find( (item) => this.emailValidator.isNotAcceptable(item))
        if (email) {
            this.addViolation(`en e-postadresse ( ${email} )`)
        }

        const fnr = foedselsnummer?.find( (item) => this.fodselsnummerValidator.isNotAcceptable(item));
        if (fnr) {
            this.addViolation(`et fødselsnummer ( ${fnr} )`)
        }

        const tlf = finnTelefonNummer(text);
        if (tlf && tlf !== fnr) {
            this.addViolation(`et telefonnummer ( ${tlf} )`)
        }
    }

}
