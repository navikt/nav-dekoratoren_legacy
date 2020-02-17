import Lenke from 'nav-frontend-lenker';
import Tekst from '../../../../../../../tekster/finn-tekst';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

interface Props {
    url: string;
    lenkeTekstId: string;
    stikkord: string;
    className: string;
    id: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const BunnseksjonLenke = ({ url, lenkeTekstId, stikkord, className , id, onClick}: Props) => {
    const cls = BEMHelper(className);

    return (
        <div className={cls.element('bunn-seksjon-col')}>
            <Undertittel>
                <Lenke
                    href={url}
                    className={cls.element('bunn-lenke')}
                    id={id}
                    onClick={onClick}
                >
                    <Tekst id={lenkeTekstId}/>
                </Lenke>
            </Undertittel>
            <ul className={cls.element('bunn-lenke-stikkord')}>
                <Undertekst>
                    {stikkord.split('|').map(ord =>
                        <li key={ord}><span className={'bullet'}/>{ord}</li>
                    )}
                </Undertekst>
            </ul>
        </div>
    );
};

export default BunnseksjonLenke;

