import { Locale } from '../store/reducers/language-duck';
import { finnTekst } from './finn-tekst';
import { LangKey } from './ledetekster';

describe('finnTekst', () => {
    it('Skal finne riktig tekst (Søk/norsk)', () => {
        const tekst = finnTekst('sok-knapp', Locale.BOKMAL);
        expect(tekst === 'SØK');
    });

    it('Skal finne riktig tekst (Søk/engelsk)', () => {
        const tekst = finnTekst('sok-knapp', Locale.ENGELSK);
        expect(tekst === 'SEARCH');
    });

    it('Skal finne riktig tekst (Søk/samisk)', () => {
        const tekst = finnTekst('sok-knapp', Locale.SAMISK);
        expect(tekst === 'OZA');
    });

    it('Skal returnere id hvis tekst ikke finnes)', () => {
        const tekst = finnTekst('mikke-mus' as LangKey, Locale.BOKMAL);
        expect(tekst === 'mikke-mus');
    });
});
