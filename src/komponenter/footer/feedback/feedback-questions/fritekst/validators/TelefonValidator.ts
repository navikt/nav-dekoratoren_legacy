export const finnTelefonNummer = (text: string): string | undefined => {
    // Finn tekst som innholder tall, mellomrom og +. Må starte med tall eller + og avslutte med tall.
    const phoneCharacters = text.match(/[\d|\+]+[\d ]+[\d]+/g);
    return phoneCharacters?.find((item) => erTelefonnummer(item));
}

const erTelefonnummer = (value: string): boolean => {
    if (value.length < 8) {
        return false;
    }

    if (value.length === 8 && /^[0-9]{8}$/i.test(value)) {
        // akkurat 8 tall
        return true;
    }

    // Ellers test for + tegn og flere tall med mellomrom.
    const regExp = /^[\+]?(?:[0-9] *){7,14}[0-9]$/;
    return (regExp.test(value))
}
