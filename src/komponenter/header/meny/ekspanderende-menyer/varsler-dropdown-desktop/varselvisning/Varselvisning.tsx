import React from 'react';
import { AppState } from '../../../../../../reducer/reducer';
import Environment from '../../../../../../utils/Environment';
import './Varselvisning.less';
import {
    GACategory,
} from '../../../../../../utils/google-analytics';
import Tekst, { finnTekst } from '../../../../../../tekster/finn-tekst';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { Undertittel } from 'nav-frontend-typografi';

type Props = {
    tabIndex: number;
}

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
});

const classname = 'varsler-display-desktop';

export const Varselvisning = ({ tabIndex }: Props) => {
    const { varsler, varslerAntall, varslerUleste, language } = useSelector(stateSelector);

    const alleVarslerLenke = varslerAntall > 5 ? (
        <div className="vis-alle-lenke">
            <LenkeMedGA
                href={Environment.API_VARSELINNBOKS_URL}
                tabIndex={tabIndex ? 0 : -1}
                gaEventArgs={{
                    category: GACategory.Header,
                    action: 'varsler/visalle',
                    label: Environment.API_VARSELINNBOKS_URL,
                }}
            >
                <Tekst id={'varsler-visalle'} />
                {varslerUleste > 0
                    ? ` (${varslerUleste} ${finnTekst(
                        'varsler-nye',
                        language,
                    )})`
                    : ''}
            </LenkeMedGA>
        </div>
    ) : null;

    return (
        <div className={classname}>
            <Undertittel>
                <Tekst id={'varsler'} />
            </Undertittel>
            {alleVarslerLenke}
            <VarslerParsed varsler={varsler} />
            {alleVarslerLenke}
        </div>
    );
};
