import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import BEMHelper from 'utils/bem';

interface Props {
    url: string;
    lenkeTekstId: string;
    stikkord: string;
    className: string;
    id: string;
    onClick?: (event: MouseEvent) => void;
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
            <div className={cls.element('bunn-lenke-visning')}>
                <Undertittel className={cls.element('bunn-lenke-tekst')}>
                    <Tekst id={lenkeTekstId} />
                </Undertittel>
                <ul className={cls.element('bunn-lenke-stikkord')}>
                    <Undertekst>
                        {stikkord &&
                            stikkord.split('|').map((ord) => (
                                <li key={ord}>
                                    <span className={'bullet'} />
                                    {ord}
                                </li>
                            ))}
                    </Undertekst>
                </ul>
            </div>
        </LenkeMedGA>
    );
};

export default BunnseksjonLenke;
