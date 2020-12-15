
const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const finnEmail = (text: string): string | undefined => {
    // Finn grupper av sammenhengende tekst uten mellomrom
    const stringGroups = text.match(/[.\S]+/g);
    return stringGroups?.find((item) => isValidEmail(item));
}

export const isValidEmail = (text: string): boolean => {
    return emailRegExp.test(text);
}