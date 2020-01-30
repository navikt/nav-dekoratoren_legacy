import React from 'react';
import { Language } from '../reducer/language-duck';
import { finnTekst } from './finn-tekst';

describe('finnTekst', () => {
    it('Skal finne riktig tekst (Søk/norsk)', () => {
        const tekst = finnTekst('sok-knapp', Language.NORSK);
        expect(tekst === 'SØK');
    });

    it('Skal finne riktig tekst (Søk/engelsk)', () => {
        const tekst = finnTekst('sok-knapp', Language.ENGELSK);
        expect(tekst === 'SEARCH');
    });

    it('Skal finne riktig tekst (Søk/samisk)', () => {
        const tekst = finnTekst('sok-knapp', Language.SAMISK);
        expect(tekst === 'OZA');
    });

    it('Skal returnere id hvis tekst ikke finnes)', () => {
        const tekst = finnTekst('mikke-mus', Language.NORSK);
        expect(tekst === 'mikke-mus');
    });
});
