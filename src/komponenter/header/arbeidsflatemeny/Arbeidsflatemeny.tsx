import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import { Undertekst } from 'nav-frontend-typografi';
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
import Tekst from '../../../tekster/finn-tekst';
import { erNavDekoratoren } from '../../../utils/Environment';

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
                {arbeidsflateLenker().map(
                    (lenke: {
                        tittelId: string;
                        url: string;
                        key: MenuValue;
                    }) => {
                        return (
                            <li
                                role="tab"
                                aria-selected={arbeidsflate === lenke.key}
                                className={cls.element('liste-element')}
                                key={lenke.key}
                            >
                                <LenkeMedGA
                                    classNameOverride={cls.element('lenke')}
                                    href={lenke.url}
                                    onClick={event => {
                                        event.preventDefault();
                                        oppdaterSessionStorage(lenke.key);
                                        settArbeidsflate();
                                        if (!erNavDekoratoren()) {
                                            window.location.href = lenke.url;
                                        }
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
                                            <Tekst id={lenke.tittelId} />
                                        </Undertekst>
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
