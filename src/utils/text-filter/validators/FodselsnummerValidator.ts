import { TextValidator } from './TextValidator';

export class FodselsnummerValidator implements TextValidator {
    lengthIsValid(s: string) {
        return s.length == 11;
    }

    isNotAcceptable(s: string) {
        return this.lengthIsValid(s) && !isNaN(parseInt(s));
    }
}
