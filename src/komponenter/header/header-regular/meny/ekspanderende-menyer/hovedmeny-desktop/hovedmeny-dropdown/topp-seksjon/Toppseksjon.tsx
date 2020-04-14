import Tekst from '../../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../../utils/bem';
import KbNav, {
    NaviGroup,
} from '../../../../../../../../utils/keyboard-navigation/kb-navigation';
import { GACategory } from '../../../../../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../../../../../LenkeMedGA';
import './Toppseksjon.less';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../../reducer/reducers';
import {
    getArbeidsflateContext,
    settArbeidsflate,
} from '../../../../../arbeidsflatemeny/arbeidsflate-lenker';

interface Props {
    classname: string;
}

export const Toppseksjon = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { arbeidsflate } = useSelector((state: AppState) => ({
        arbeidsflate: state.arbeidsflate.status,
    }));
    const context = getArbeidsflateContext(XP_BASE_URL, arbeidsflate);

    return (
        <div className={cls.element('topp-seksjon')}>
            <LenkeMedGA
                href={context.url}
                onClick={event => {
                    event.preventDefault();
                    settArbeidsflate(dispatch, context);
                }}
                className={cls.element('topp-seksjon-lenke')}
                id={KbNav.getKbId(NaviGroup.Hovedmeny, {
                    col: 0,
                    row: 1,
                    sub: 0,
                })}
                gaEventArgs={{
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
