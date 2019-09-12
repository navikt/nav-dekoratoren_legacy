import React from 'react';
import ledetekster from './ledetekster';
import { AppState } from '../reducer/reducer';
import { connect } from 'react-redux';
import { Language } from '../reducer/language-duck';

export function utledTekst(id: string, language: Language): string {
    let ledetekst: string = ledetekster[id];
    let id2 = id;

    if (language === Language.ENGELSK) {
        id2 += '-en';
        ledetekst = ledetekster[id2];
    } else if (language === Language.SAMISK) {
        id2 += '-se';
        ledetekst = ledetekster[id2];
    }
    if (!ledetekst) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }
    return ledetekst;
}

interface OwnProps {
    id: string;
}

interface StateProps {
    language: Language;
}

type TekstProps = OwnProps & StateProps;

const Tekst = ({ id, language }: TekstProps) => {
    return <>{utledTekst(id, language)}</>;
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Tekst);
