import { EmailValidator } from './validators/EmailValidator';
import { FodselsnummerValidator } from './validators/FodselsnummerValidator';

export class Filter {

    violations: string[]
    emailValidator: EmailValidator;
    fodselsnummerValidator: FodselsnummerValidator;

    constructor(initialViolations: string[]) {
        this.violations = initialViolations;
        this.emailValidator = new EmailValidator();
        this.fodselsnummerValidator = new FodselsnummerValidator();
    }

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
