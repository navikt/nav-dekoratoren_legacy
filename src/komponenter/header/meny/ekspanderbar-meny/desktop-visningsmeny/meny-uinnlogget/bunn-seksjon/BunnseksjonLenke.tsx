import Lenke from 'nav-frontend-lenker';
import Tekst from '../../../../../../../tekster/finn-tekst';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    url: string;
    lenkeTekstId: string;
    stikkordIds: Array<string>;
    className: string;
}

const BunnseksjonLenke = ({ url, lenkeTekstId, stikkordIds, className }: Props) => {
    const cls = BEMHelper(className);

    return (
        <div>
            <Undertittel>
                <Lenke href={url} className={cls.element('bunn-lenke')}>
                    <Tekst id={lenkeTekstId}/>
                </Lenke>
            </Undertittel>
            <ul className={cls.element('bunn-lenke-stikkord')}>
                {stikkordIds.map((id, index) => (
                    <li>{index !== 0 && <span className={'bullet'}>{'•'}</span>}<Tekst id={id}/></li>
                ))}
            </ul>
        </div>
    );
};

export default BunnseksjonLenke
