import React from 'react';
import { ledetekster } from './ledetekster';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { Locale } from 'store/reducers/language-duck';

export function finnTekst(id: string, language: Locale): string {
    // Correct language
    let ledetekst: string;
    switch (language) {
        default:
        case Locale.BOKMAL:
        case Locale.NYNORSK:
            ledetekst = ledetekster[id];
            break;
        case Locale.POLSK:
        case Locale.ENGELSK:
            id += '-en';
            ledetekst = ledetekster[id];
            break;
        case Locale.SAMISK:
            id += '-se';
            ledetekst = ledetekster[id];
            break;
    }

    // Check for errors
    if (!ledetekst) {
        console.warn(
            `Kunne ikke finne tekst med id: ${id}! Returnerer oppgitt id.`
        );
        return id;
    }
    return ledetekst;
}

interface Props {
    id: string;
}

const Tekst = ({ id }: Props) => {
    const { language } = useSelector((state: AppState) => state.language);
    return <>{finnTekst(id, language)}</>;
};

export default Tekst;
