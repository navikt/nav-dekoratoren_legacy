import React from 'react';
import { ledetekster } from './ledetekster';
import { AppState } from '../store/reducers';
import { connect } from 'react-redux';
import { spraakValgetErSamisk } from 'store/reducers/language-duck';
import { spraakValgetErNorsk } from 'store/reducers/language-duck';
import { Language, spraakValgetErEngelsk } from 'store/reducers/language-duck';

export function finnTekst(id: string, language: Language): string {
    let ledetekst: string = ledetekster[id];

    if (!ledetekst) {
        console.warn(
            `Kunne ikke finne tekst med id: ${id}! Returnerer oppgitt id.`
        ); // tslint:disable-line:no-console
        return id;
    }
    if (spraakValgetErNorsk(language)) {
        return ledetekst;
    } else if (spraakValgetErEngelsk(language)) {
        id += '-en';
        ledetekst = ledetekster[id];
    } else if (spraakValgetErSamisk(language)) {
        id += '-se';
        ledetekst = ledetekster[id];
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
    return <>{finnTekst(id, language)}</>;
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Tekst);
