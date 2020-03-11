import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import BEMHelper from '../../../utils/bem';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import { arbeidsflateLenker } from './arbeidsflate-lenker';
import './MobilarbeidsflateValg.less';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { finnTekst } from '../../../tekster/finn-tekst';
import { Language } from '../../../reducer/language-duck';
import { erNavDekoratoren } from '../../../utils/Environment';

interface Props {
    tabindex: boolean;
    lang: Language;
}

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

const MobilarbeidsflateValg = ({
    arbeidsflate,
    settArbeidsflate,
    tabindex,
    lang,
}: StateProps & DispatchProps & Props) => {
    const cls = BEMHelper('mobil-arbeidsflate-valg');
    const oppdatereArbeidsflateValg = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
        valgVerdi: MenuValue
    ) => {
        e.preventDefault();
        oppdaterSessionStorage(valgVerdi);
        settArbeidsflate();
    };

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker().map(
                (lenke: {
                    tittelId: string;
                    url: string;
                    key: MenuValue;
                    stikkord: string;
                }) => {
                    return arbeidsflate === lenke.key ? null : (
                        <li
                            key={lenke.key}
                            className={cls.element('liste-element')}
                        >
                            <LenkeMedGA
                                href={lenke.url}
                                onClick={event => {
                                    oppdatereArbeidsflateValg(event, lenke.key);
                                    if (!erNavDekoratoren()) {
                                        window.location.href = lenke.url;
                                    }
                                }}
                                tabIndex={tabindex ? 0 : -1}
                                gaEventArgs={{
                                    category: GACategory.Header,
                                    action: 'arbeidsflate-valg',
                                }}
                            >
                                <Undertittel>
                                    <span
                                        className={cls.element('lenke-tittel')}
                                    >
                                        {lenke.tittelId
                                            .charAt(0)
                                            .toUpperCase()
                                            .concat(
                                                lenke.tittelId
                                                    .slice(1)
                                                    .toLowerCase()
                                            )}
                                    </span>{' '}
                                </Undertittel>
                                <Normaltekst>
                                    {finnTekst(lenke.stikkord, lang)
                                        .split('|')
                                        .map(ord => {
                                            return (
                                                <span
                                                    className="bullet"
                                                    key={ord}
                                                >
                                                    {ord}
                                                </span>
                                            );
                                        })}
                                </Normaltekst>
                            </LenkeMedGA>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflate: () => dispatch(finnArbeidsflate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobilarbeidsflateValg);
