import Lenke from 'nav-frontend-lenker';
import Environment from '../../../../../../../utils/Environment';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import KbNav, {
    NaviGroup,
} from '../../../../../../../utils/keyboard-navigation/kb-navigation';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';

interface Props {
    classname: string;
    arbeidsflate: MenuValue;
}

export const Toppseksjon = ({ classname, arbeidsflate }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('topp-seksjon')}>
            <Lenke
                href={Environment.BASE_URL}
                className={cls.element('topp-seksjon-lenke')}
                id={KbNav.getKbId(NaviGroup.DesktopHeaderDropdown, {
                    col: 0,
                    row: 1,
                    sub: 0,
                })}
            >
                <Tekst id={'til-forside'} />
            </Lenke>
            <Systemtittel className={cls.element('topp-seksjon-tittel')}>
                <Tekst id={`rolle-${arbeidsflate.toLowerCase()}`} />
            </Systemtittel>
        </div>
    );
};
