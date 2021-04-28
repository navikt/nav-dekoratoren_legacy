export function formaterFodselsnummer(fnr: string) {
    return fnr.substring(0, 6) + ' ' + fnr.substring(6);
}
