import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import BEMHelper from 'utils/bem';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { finnTekst } from 'tekster/finn-tekst';
import { Language } from 'store/reducers/language-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import Tekst from 'tekster/finn-tekst';
import { bunnLenker } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import './MobilarbeidsflateValg.less';
import BunnseksjonLenke from 'komponenter/header/header-regular/desktop/hovedmeny/bunn-seksjon/BunnseksjonLenke';
import KbNav from 'utils/keyboard-navigation/kb-navigation';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';

interface Props {
    lang: Language;
}

const stateProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const MobilarbeidsflateValg = ({ lang }: Props) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { arbeidsflate, environment } = useSelector(stateProps);
    const cls = BEMHelper('mobil-arbeidsflate-valg');
    const lenker = bunnLenker(environment)[arbeidsflate];

    return (
        <ul className={cls.className}>
            {lenker.map((lenke, i) => (
                <li key={i} className={cls.element('liste-element')}>
                    <BunnseksjonLenke
                        url={lenke.url}
                        lenkeTekstId={lenke.lenkeTekstId}
                        stikkord={finnTekst(lenke.stikkordId, lang)}
                        className={cls.className}
                        onClick={(event) => {
                            event.preventDefault();
                            const context = lenke as ArbeidsflateLenke;
                            setCookie(
                                'decorator-context',
                                context.key,
                                cookieOptions
                            );
                            if (erNavDekoratoren()) {
                                dispatch(settArbeidsflate(context.key));
                            } else {
                                window.location.href = context.url;
                            }
                        }}
                        key={lenke.lenkeTekstId}
                    />
                </li>
            ))}
        </ul>
    );
};

export default MobilarbeidsflateValg;
