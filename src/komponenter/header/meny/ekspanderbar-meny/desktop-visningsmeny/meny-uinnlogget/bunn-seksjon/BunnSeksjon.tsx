import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';
import KbNav, { NaviGroup } from '../../keyboard-navigation/kb-navigation';

interface Props {
    classname: string;
}

interface LenkeData {
    url: string;
    lenkeTekstId: string;
    stikkordIds: Array<string>;
}

const lenker: Array<LenkeData> = [
    {
        url: '#',
        lenkeTekstId: 'person-minside-lenke',
        stikkordIds: ['Utbetalingsoversikt', 'Saksoversikt', 'Sykefravær'],
    },
    {
        url: '#',
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordIds: ['Tjenester og skjemaer', 'Rekruttering', 'Oppfølging', 'Inkluderende arbeidsliv', 'Hjelpemidler'],
    },
    {
        url: '#',
        lenkeTekstId: 'samarbeidspartner-side-lenke',
        stikkordIds: ['Kommuner', 'Utdanningsområdet', 'Psykisk helse', 'Hjelpemidler', 'Leger og behandlere'],
    },
];


const BunnSeksjon = ({ classname }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <>
            <hr className={cls.element('bunn-separator')} />
            <div className={cls.element('bunn-seksjon')}>
                {lenker.map((lenke, index) => (
                    <BunnseksjonLenke
                        url={lenke.url}
                        lenkeTekstId={lenke.lenkeTekstId}
                        stikkordIds={lenke.stikkordIds}
                        className={classname}
                        id={KbNav.getId(NaviGroup.DesktopHeaderDropdown, index, 3)}
                        key={lenke.lenkeTekstId}
                    />)
                )}
            </div>
        </>
    );
};

export default BunnSeksjon;
