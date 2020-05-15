import React from 'react';
import { ledetekster } from './ledetekster';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { Language } from 'store/reducers/language-duck';

export function finnTekst(id: string, language: Language): string {
    // Correct language
    let ledetekst: string;
    switch (language) {
        case Language.NORSK:
            ledetekst = ledetekster[id];
            break;
        case Language.ENGELSK:
            id += '-en';
            ledetekst = ledetekster[id];
            break;
        case Language.SAMISK:
            id += '-se';
            ledetekst = ledetekster[id];
            break;
        default:
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
