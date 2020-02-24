import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import { EtikettLiten } from 'nav-frontend-typografi';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import BEMHelper from '../../../utils/bem';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import { arbeidsflateLenker } from './arbeidsflate-lenker';
import './Arbeidsflatemeny.less';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

type arbeidsflateProps = StateProps & DispatchProps;

const Arbeidsflatemeny = ({
    settArbeidsflate,
    arbeidsflate,
}: arbeidsflateProps) => {
    const cls = BEMHelper('arbeidsflate');

    return (
        <nav
            className={cls.className}
            id="decorator-arbeidsflatemeny"
            aria-label="Velg brukergruppe"
        >
            <ul className={cls.element('topp-liste-rad')} role="tablist">
                {arbeidsflateLenker.map(
                    (lenke: {
                        tittel: string;
                        url: string;
                        key: MenuValue;
                    }) => {
                        return (
                            <li
                                role="tab"
                                aria-selected={arbeidsflate === lenke.tittel}
                                className={cls.element('liste-element')}
                                key={lenke.tittel}
                            >
                                <LenkeMedGA
                                    classNameOverride={cls.element('lenke')}
                                    href={lenke.url}
                                    onClick={event => {
                                        event.preventDefault();
                                        oppdaterSessionStorage(lenke.key);
                                        settArbeidsflate();
                                    }}
                                    gaEventArgs={{
                                        category: GACategory.Header,
                                        action: 'arbeidsflate-valg',
                                    }}
                                >
                                    <div
                                        className={cls.element(
                                            'lenke-inner',
                                            arbeidsflate === lenke.tittel
                                                ? 'active'
                                                : ''
                                        )}
                                    >
                                        <EtikettLiten>
                                            {lenke.tittel}
                                        </EtikettLiten>
                                    </div>
                                </LenkeMedGA>
                            </li>
                        );
                    }
                )}
            </ul>
        </nav>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflate: () => dispatch(finnArbeidsflate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Arbeidsflatemeny);
