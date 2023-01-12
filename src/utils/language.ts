import { Locale } from 'store/reducers/language-duck';

type Section = 'header' | 'footer';

export const mapToClosestTranslatedLanguage = (language: Locale, section: Section): Locale => {
    // For Samisk, footer is obly available in Bokmål.
    if (section === 'footer' && language === Locale.SAMISK) {
        return Locale.BOKMAL;
    }

    return {
        [Locale.BOKMAL]: Locale.BOKMAL,
        [Locale.NYNORSK]: Locale.BOKMAL,
        [Locale.SAMISK]: Locale.SAMISK,
        [Locale.RUSSISK]: Locale.ENGELSK,
        [Locale.ENGELSK]: Locale.ENGELSK,
        [Locale.UKRAINSK]: Locale.ENGELSK,
        [Locale.POLSK]: Locale.ENGELSK,
        [Locale.IKKEBESTEMT]: Locale.BOKMAL,
    }[language];
};
