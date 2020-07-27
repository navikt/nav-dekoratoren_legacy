import { EmailValidator } from './validators/EmailValidator';
import { FodselsnummerValidator} from './validators/FodselsnummerValidator';

const sampleText = "Hei jeg heter Andreas Amundsen og min epostaddresse er andreas@gmail.com 12345678901"

export class Filter {

    violations: string[]
    emailValidator: EmailValidator;
    fodselsnummerValidator: FodselsnummerValidator;

    constructor(initialViolations: string[]) {
        this.violations = initialViolations;
        this.emailValidator = new EmailValidator();
        this.fodselsnummerValidator = new FodselsnummerValidator();
    }

    addViolation(violation: string):void {
        !this.violations.includes(violation) && this.violations.push(violation);
    };

    getViolations():string[] {
        return this.violations;
    }

    /*
    Return violations on either the form "e-postaddresse og fødselsnummer" or "e-postaddresse"/"fødeselsnummer", depending on the numer
    of violations
    */
    getViolationsFormatted():string {
        if (!this.violations.length) {
            return "";
        }

        return this.violations.length == 2 ? " " + this.violations[0] + " og " + this.violations[1] : " " + this.violations[0]
    }

    checkForViolations(text: string):void {
        let textSplitted = text.split(" ");

        for (let index in textSplitted) {
            this.emailValidator.isNotAcceptable(textSplitted[index]) && this.addViolation("e-postadresse")
            this.fodselsnummerValidator.isNotAcceptable(textSplitted[index]) && this.addViolation("fødselsnummer")
        }
    }
}
