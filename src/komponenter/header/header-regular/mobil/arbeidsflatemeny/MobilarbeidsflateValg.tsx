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
import './MobilarbeidsflateValg.less';
import { bunnLenker } from 'komponenter/header/header-regular/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import Tekst from 'tekster/finn-tekst';

interface Props {
    tabindex: boolean;
    lang: Language;
}

const stateProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const MobilarbeidsflateValg = ({ tabindex, lang }: Props) => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { arbeidsflate, environment } = useSelector(stateProps);
    const cls = BEMHelper('mobil-arbeidsflate-valg');
    const lenker = bunnLenker(environment)[arbeidsflate];

    return (
        <ul className={cls.className}>
            {lenker.map((lenke, i) => (
                <li key={i} className={cls.element('liste-element')}>
                    <LenkeMedGA
                        href={lenke.url}
                        onClick={(event) => {
                            event.preventDefault();
                            setCookie(
                                'decorator-context',
                                lenke.key,
                                cookieOptions
                            );
                            if (erNavDekoratoren() && lenke.key) {
                                dispatch(settArbeidsflate(lenke.key));
                            } else {
                                window.location.href = lenke.url;
                            }
                        }}
                        tabIndex={tabindex ? 0 : -1}
                        gaEventArgs={{
                            context: arbeidsflate,
                            category: GACategory.Header,
                            action: 'arbeidsflate-valg',
                        }}
                    >
                        <Undertittel>
                            <span className={cls.element('lenke-tittel')}>
                                <Tekst id={lenke.lenkeTekstId} />
                            </span>{' '}
                        </Undertittel>
                        <Normaltekst>
                            {finnTekst(lenke.stikkordId, lang)
                                .split('|')
                                .map((ord) => {
                                    return (
                                        <span className="bullet" key={ord}>
                                            {ord}
                                        </span>
                                    );
                                })}
                        </Normaltekst>
                    </LenkeMedGA>
                </li>
            ))}
        </ul>
    );
};

export default MobilarbeidsflateValg;
