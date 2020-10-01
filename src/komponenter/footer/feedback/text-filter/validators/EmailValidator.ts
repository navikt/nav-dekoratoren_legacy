// import { TextValidator } from './TextValidator';

export const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class EmailValidator {
    isNotAcceptable(s: string) {
        return emailRegExp.test(s);
    }
}
