import { TextValidator } from './TextValidator';

export class FodselsnummerValidator implements TextValidator {
    validator: any;

    constructor() {
        this.validator = require('@navikt/fnrvalidator');
        
    }

    isNotAcceptable(s: string) {
        const fnr = this.validator.fnr(s)
        const dnr = this.validator.dnr(s)
        const key: string = 'status'

        return (fnr[key] === 'valid') || (dnr[key] === 'valid') 
    }
}
