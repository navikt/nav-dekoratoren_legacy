import { Locale } from '../store/reducers/language-duck';

export const getHomeUrl = (origin: string, language: Locale) =>
    ({
        [Locale.BOKMAL]: origin,
        [Locale.NYNORSK]: origin,
        [Locale.IKKEBESTEMT]: origin,
        [Locale.ENGELSK]: `${origin}/en/home`,
        [Locale.POLSK]: `${origin}/en/home`,
        [Locale.UKRAINSK]: `${origin}/en/home`,
        [Locale.RUSSISK]: `${origin}/en/home`,
        [Locale.SAMISK]: `${origin}/se/samegiella`,
    }[language] || origin);
