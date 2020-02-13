import Lenke from 'nav-frontend-lenker';
import Environment from '../../../../../../../utils/Environment';
import Tekst from '../../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';

interface Props {
    classname: string;
    arbeidsflate: string;
}

const Toppseksjon = ({classname, arbeidsflate}: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('topp-seksjon')}>
            <Lenke href={Environment.baseUrl} className={cls.element('topp-seksjon-lenke')}>
                <Tekst id={'til-forside'} />
            </Lenke>
            <Systemtittel className={cls.element('topp-seksjon-tittel')}>
                <Tekst id={`rolle-${arbeidsflate.toLowerCase()}`} />
            </Systemtittel>
        </div>
    );
};

export default Toppseksjon
