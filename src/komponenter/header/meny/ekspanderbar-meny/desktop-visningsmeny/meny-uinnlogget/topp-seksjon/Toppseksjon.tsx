import Lenke from 'nav-frontend-lenker';
import Environment from '../../../../../../../utils/Environment';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import KbNav, { NavGroup } from '../../../../../../../utils/kb-nav';

interface Props {
    classname: string;
    arbeidsflate: string;
}

const Toppseksjon = ({classname, arbeidsflate}: Props) => {
    const cls = BEMHelper(classname);
    const id = KbNav.getId(NavGroup.DesktopHeaderDropdown, 1, 1);

    return (
        <div className={cls.element('topp-seksjon')}>
            <Lenke
                href={Environment.baseUrl}
                className={cls.element('topp-seksjon-lenke asdflenke')}
                id={id}
                onFocus={() => console.log('focused!')}
            >
                <Tekst id={'til-forside'} />
            </Lenke>
            <Systemtittel className={cls.element('topp-seksjon-tittel')}>
                <Tekst id={`rolle-${arbeidsflate.toLowerCase()}`} />
            </Systemtittel>
        </div>
    );
};

export default Toppseksjon
