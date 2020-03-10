import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Undertekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import { arbeidsflateLenker, settArbeidsflate } from './arbeidsflate-lenker';
import './Arbeidsflatemeny.less';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import Tekst from '../../../tekster/finn-tekst';
import {
    getKbId,
    NaviGroup,
} from '../../../utils/keyboard-navigation/kb-navigation';

const Arbeidsflatemeny = () => {
    const cls = BEMHelper('arbeidsflate');
    const { arbeidsflate } = useSelector((state: AppState) => ({
        arbeidsflate: state.arbeidsflate.status,
    }));

    return (
        <nav
            className={cls.className}
            id="decorator-arbeidsflatemeny"
            aria-label="Velg brukergruppe"
        >
            <ul className={cls.element('topp-liste-rad')} role="tablist">
                {arbeidsflateLenker().map((lenke, index) => {
                    return (
                        <li
                            role="tab"
                            aria-selected={arbeidsflate === lenke.key}
                            className={cls.element('liste-element')}
                            key={lenke.key}
                        >
                            <LenkeMedGA
                                classNameOverride={cls.element('lenke')}
                                id={getKbId(
                                    NaviGroup.HeaderMenylinje,
                                    { col: index, row: 0, sub: 0 }
                                )}
                                href={lenke.url}
                                onClick={event => {
                                    event.preventDefault();
                                    settArbeidsflate(lenke);
                                }}
                                gaEventArgs={{
                                    category: GACategory.Header,
                                    action: 'arbeidsflate-valg',
                                }}
                            >
                                <div
                                    className={cls.element(
                                        'lenke-inner',
                                        arbeidsflate === lenke.key
                                            ? 'active'
                                            : ''
                                    )}
                                >
                                    <Undertekst>
                                        <Tekst id={lenke.lenkeTekstId} />
                                    </Undertekst>
                                </div>
                            </LenkeMedGA>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Arbeidsflatemeny;
