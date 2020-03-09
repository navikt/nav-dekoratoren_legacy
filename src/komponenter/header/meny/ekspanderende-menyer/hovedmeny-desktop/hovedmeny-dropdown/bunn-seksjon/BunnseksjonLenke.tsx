import Tekst from '../../../../../../../tekster/finn-tekst';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { LenkeMedGA } from '../../../../../../LenkeMedGA';
import { GACategory } from '../../../../../../../utils/google-analytics';

interface Props {
    url: string;
    lenkeTekstId: string;
    stikkord: string;
    className: string;
    id: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const BunnseksjonLenke = ({
    url,
    lenkeTekstId,
    stikkord,
    className,
    id,
    onClick,
}: Props) => {
    const cls = BEMHelper(className);

    return (
        <div className={cls.element('bunn-seksjon-col')}>
            <Undertittel>
                <LenkeMedGA
                    href={url}
                    className={cls.element('bunn-lenke')}
                    id={id}
                    onClick={onClick}
                    gaEventArgs={{
                        category: GACategory.Meny,
                        action: `hovedmeny/arbeidsflatelenke`,
                        label: url,
                    }}
                >
                    <Tekst id={lenkeTekstId} />
                </LenkeMedGA>
            </Undertittel>
            <ul className={cls.element('bunn-lenke-stikkord')}>
                <Undertekst>
                    {stikkord &&
                        stikkord.split('|').map(ord => (
                            <li key={ord}>
                                <span className={'bullet'} />
                                {ord}
                            </li>
                        ))}
                </Undertekst>
            </ul>
        </div>
    );
};

export default BunnseksjonLenke;
