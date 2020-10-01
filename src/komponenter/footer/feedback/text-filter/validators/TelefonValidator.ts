

// fra: https://regex101.com/r/6DlhE2/3 men lov ned til 8 tall
export const regExp = /^(?=(?:\D*\d){8,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/i;

export const finnTelefonNummer = (text: string): string | undefined => {
    // Finn tekst som innholder tall, mellomrom og spesialtegn ()-+,
    // Må starte med tall, + eller ( og slutte med tall
    const phoneCharacters = text.match(/[\d|\+|\(]+[\d \t\-\(\)]+[\d]+/g);
    return phoneCharacters?.find((item) => erTelefonnummer(item));
}

const erTelefonnummer = (value: string): boolean => {
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
