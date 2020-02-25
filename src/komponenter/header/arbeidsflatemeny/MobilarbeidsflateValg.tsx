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

const oppdatereArbeidsflateValg = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    valgVerdi: MenuValue
) => {
    e.preventDefault();
    oppdaterSessionStorage(valgVerdi);
};

const MobilarbeidsflateValg = ({
    arbeidsflate,
    settArbeidsflate,
    tabindex,
    lang,
}: StateProps & DispatchProps & Props) => {
    const cls = BEMHelper('mobil-arbeidsflate-valg');

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker.map(
                (lenke: {
                    tittel: MenuValue;
                    url: string;
                    key: MenuValue;
                    stikkord: string;
                }) => {
                    return arbeidsflate === lenke.key ? null : (
                        <li
                            key={lenke.tittel}
                            className={cls.element('liste-element')}
                        >
                            <LenkeMedGA
                                href={lenke.url}
                                onClick={event => {
                                    oppdatereArbeidsflateValg(event, lenke.key);
                                    settArbeidsflate();
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
                                        {lenke.tittel
                                            .charAt(0)
                                            .toUpperCase()
                                            .concat(
                                                lenke.tittel
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
