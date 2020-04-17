import Tekst from 'tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from 'utils/bem';
import KbNav, { NaviGroup } from 'utils/keyboard-navigation/kb-navigation';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { getArbeidsflateContext } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import './Toppseksjon.less';

interface Props {
    classname: string;
}

export const Toppseksjon = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const context = getArbeidsflateContext(XP_BASE_URL, arbeidsflate);

    return (
        <div className={cls.element('topp-seksjon')}>
            <LenkeMedGA
                href={context.url}
                onClick={event => {
                    event.preventDefault();
                    dispatch(settArbeidsflate(context.key));
                    if (!erNavDekoratoren()) {
                        window.location.href = context.url;
                    }
                }}
                className={cls.element('topp-seksjon-lenke')}
                id={KbNav.getKbId(NaviGroup.Hovedmeny, {
                    col: 0,
                    row: 1,
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
            <Systemtittel className={cls.element('topp-seksjon-tittel')}>
                <Tekst id={`rolle-${arbeidsflate.toLowerCase()}`} />
            </Systemtittel>
        </div>
    );
};
