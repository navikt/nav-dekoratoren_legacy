import Environment from '../../../../../../../utils/Environment';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import KbNav, {
    NaviGroup,
} from '../../../../../../../utils/keyboard-navigation/kb-navigation';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import { GACategory } from '../../../../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../../../../LenkeMedGA';
import './Toppseksjon.less';

interface Props {
    classname: string;
    arbeidsflate: MenuValue;
}

export const Toppseksjon = ({ classname, arbeidsflate }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('topp-seksjon')}>
            <LenkeMedGA
                href={Environment.XP_BASE_URL}
                className={cls.element('topp-seksjon-lenke')}
                id={KbNav.getKbId(NaviGroup.Hovedmeny, {
                    col: 0,
                    row: 1,
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
