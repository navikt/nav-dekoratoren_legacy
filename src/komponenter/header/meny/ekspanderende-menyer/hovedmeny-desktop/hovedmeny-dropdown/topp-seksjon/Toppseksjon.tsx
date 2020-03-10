import Environment from '../../../../../../../utils/Environment';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import KbNav, {
    NaviGroup,
} from '../../../../../../../utils/keyboard-navigation/kb-navigation';
import { GACategory } from '../../../../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../../../../LenkeMedGA';
import './Toppseksjon.less';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../../reducer/reducer';
import {
    settArbeidsflateOgRedirect,
    getArbeidsflateContext,
} from '../../../../../arbeidsflatemeny/arbeidsflate-lenker';
import { finnArbeidsflate } from '../../../../../../../reducer/arbeidsflate-duck';

interface Props {
    classname: string;
}

export const Toppseksjon = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const { arbeidsflate } = useSelector((state: AppState) => ({
        arbeidsflate: state.arbeidsflate.status,
    }));
    const context = getArbeidsflateContext(arbeidsflate);

    return (
        <div className={cls.element('topp-seksjon')}>
            <LenkeMedGA
                href={context.url}
                onClick={event => {
                    event.preventDefault();
                    settArbeidsflateOgRedirect(context, () =>
                        dispatch(finnArbeidsflate())
                    );
                }}
                className={cls.element('topp-seksjon-lenke')}
                id={KbNav.getKbId(NaviGroup.DesktopHovedmeny, {
                    col: 0,
                    row: 0,
                    sub: 0,
                })}
                gaEventArgs={{
                    category: GACategory.Meny,
                    action: `hovedmeny/forsidelenke`,
                    label: Environment.XP_BASE_URL,
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
