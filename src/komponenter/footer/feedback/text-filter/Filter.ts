import { EmailValidator } from './validators/EmailValidator';
import { FodselsnummerValidator } from './validators/FodselsnummerValidator';

/*

Tar inn fritekst og finner ut om den inneholder enten en e-postadresse eller fødselsnummer

Foreslåtte bruksområder:
- Koble mot et onChange event på tekstfelt, slik at brukeren får varsel når enten e-postadresse eller fødselsnummer er skrevet inn
- Koble opp mot 'Send inn'-knapp i Elaborated og ParitalNo

Dersom brukeren skriver inn enten e-postaddresse eller fødselsnummer bør dette bli varslet om i feiloppsummeringsboksen

Flere validatorer kan legges til ved å implementere TextValidator interface

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

    getViolations(): string[] {
        return this.violations;
    }

    getViolationsFormatted(): string {
        if (!this.violations.length) {
            return '';
        }

        return this.violations.length === 2 
            ? '' + this.violations[0] + ' og ' + this.violations[1] 
            : ' ' + this.violations[0]
    }

    /*
    Splitter tekst på mellomrom og kjører sjekk (e-postaddresse/fødselsnummer) for hvert element i listen.
    Dersom overtredelser blir oppdaget blir dette lagt til i violations
    */
    checkForViolations(text: string): void {
        const textSplitted = text.split(' ');

        for (const index in textSplitted) {
            if (this.emailValidator.isNotAcceptable(textSplitted[index])) {
                this.addViolation('e-postadresse')

            } else if (this.fodselsnummerValidator.isNotAcceptable(textSplitted[index])) {
                this.addViolation('fødselsnummer')
            }
        }
    }
}
