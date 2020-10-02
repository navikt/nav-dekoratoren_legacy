export const finnTelefonNummer = (text: string): string | undefined => {
    // Finn tekst som innholder tall, mellomrom og +. Må starte med tall eller + og avslutte med tall.
    const phoneCharacters = text.match(/[\d|\+]+[\d ]+[\d]+/g);
    return phoneCharacters?.find((item) => erTelefonnummer(item));
}

const erTelefonnummer = (value: string): boolean => {
    const regExp = /^[\+]?(?:[0-9] *){7,14}[0-9]$/;


    if (value.length < 8) {
        // Tlfnr er ikke mindre enn 8, eller større enn 15
        return false;
    }

    if (value.length === 8 && /^[0-9]{8}$/i.test(value)) {
        // 8 tall
        return true;
    }

    if (regExp.test(value)) {
        // minst 8 tall og landskode
        return true;
    }

    return false;
}
