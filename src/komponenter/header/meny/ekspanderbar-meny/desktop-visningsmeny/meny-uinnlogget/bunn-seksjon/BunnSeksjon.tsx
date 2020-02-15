import Environment from '../../../../../../../utils/Environment';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';

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
        url: Environment.dittNavUrl,
        lenkeTekstId: 'person-minside-lenke',
        stikkordIds: ['Utbetalingsoversikt', 'Saksoversikt', 'Sykefravær'],
    },
    {
        url: Environment.minsideArbeidsgiverUrl,
        lenkeTekstId: 'arbeidsgiver-minside-lenke',
        stikkordIds: ['Tjenester og skjemaer', 'Rekruttering', 'Oppfølging', 'Inkluderende arbeidsliv', 'Hjelpemidler'],
    },
    {
        url: 'https://www.nav.no/INSERT-URL-HERE',
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
                {lenker.map(lenke => (
                    <BunnseksjonLenke
                        url={lenke.url}
                        lenkeTekstId={lenke.lenkeTekstId}
                        stikkordIds={lenke.stikkordIds}
                        className={classname}
                        key={lenke.lenkeTekstId}
                    />)
                )}
            </div>
        </>
    );
};

export default BunnSeksjon;
