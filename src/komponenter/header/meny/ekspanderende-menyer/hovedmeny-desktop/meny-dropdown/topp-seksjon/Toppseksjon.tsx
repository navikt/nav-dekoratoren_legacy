import Environment from '../../../../../../../utils/Environment';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import KbNav, {
    NaviGroup,
} from '../../../../../../../utils/keyboard-navigation/kb-navigation';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import { LenkeMedGA } from '../../../../../../LenkeMedGA';
import { GACategory } from '../../../../../../../utils/google-analytics';

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
                id={KbNav.getKbId(NaviGroup.DesktopHeaderDropdown, {
                    col: 0,
                    row: 1,
                    sub: 0,
                })}
                gaEventArgs={{
                category: GACategory.Header,
                action: 'forside',
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
