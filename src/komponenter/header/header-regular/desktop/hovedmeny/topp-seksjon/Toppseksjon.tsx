import Tekst from 'tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from 'utils/bem';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getArbeidsflateContext } from 'komponenter/header/header-regular/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import './Toppseksjon.less';
import { useCookies } from 'react-cookie';

interface Props {
    classname: string;
}

export const Toppseksjon = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );
    const context = getArbeidsflateContext(XP_BASE_URL, arbeidsflate);

    return (
        <div className={cls.element('topp-seksjon')}>
            <Systemtittel className={cls.element('topp-seksjon-tittel')}>
                <Tekst id={`rolle-${arbeidsflate.toLowerCase()}`} />
            </Systemtittel>
            <LenkeMedGA
                href={context.url}
                onClick={(event) => {
                    event.preventDefault();
                    setCookie('decorator-context', context.key, cookieOptions);
                    if (erNavDekoratoren()) {
                        dispatch(settArbeidsflate(context.key));
                    } else {
                        window.location.href = context.url;
                    }
                }}
                id={KbNav.getKbId(KbNavGroup.Hovedmeny, {
                    col: 0,
                    row: 0,
                    sub: 0,
                })}
                gaEventArgs={{
                    context: arbeidsflate,
                    category: GACategory.Meny,
                    action: `hovedmeny/forsidelenke`,
                    label: XP_BASE_URL,
                }}
            >
                <Tekst id={'til-forside'} />
            </LenkeMedGA>
        </div>
    );
};
