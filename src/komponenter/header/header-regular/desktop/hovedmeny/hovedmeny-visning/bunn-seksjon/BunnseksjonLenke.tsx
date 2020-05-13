import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { GACategory } from 'utils/google-analytics';
import BEMHelper from 'utils/bem';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { gaEvent } from 'utils/google-analytics';

interface Props {
    url: string;
    lenkeTekstId: string;
    stikkord: string;
    className: string;
    id: string;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
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
        <LenkepanelBase
            href={url}
            className={cls.element('bunn-lenke')}
            id={id}
            onClick={(event) => {
                if (onClick) {
                    onClick(event);
                }
                gaEvent({
                    category: GACategory.Meny,
                    action: `hovedmeny/arbeidsflatelenke`,
                    label: url,
                });
            }}
            border={true}
        >
            <div className={cls.element('bunn-lenke-visning')}>
                <Undertittel className={'lenkepanel__heading'}>
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
        </LenkepanelBase>
    );
};

export default BunnseksjonLenke;
