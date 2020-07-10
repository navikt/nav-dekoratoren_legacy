import { EmailValidator } from './valdiators/EmailValidator';
import { FodselsnummerValidator } from './valdiators/FodselsnummerValidator';

const sampleText = "Hei jeg heter Andreas Amundsen og min epostaddresse er andreas.amundsen123@gmail.com 12345678901"

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
        !this.violations.includes(violation) && this.violations.push(violation);
    };

    getViolations() {
        return this.violations;
    }

    checkForViolations(text: string) {
        const textSplitted = text.split(" ")

        for (let index in textSplitted) {
            this.emailValidator.isNotAcceptable(textSplitted[index]) && this.addViolation("e-postadresse")
            this.fodselsnummerValidator.isNotAcceptable(textSplitted[index]) && this.addViolation("fødselsnummer")
        }
    }
}

const filter = new Filter([]);
filter.checkForViolations(sampleText);
console.log(filter.getViolations())