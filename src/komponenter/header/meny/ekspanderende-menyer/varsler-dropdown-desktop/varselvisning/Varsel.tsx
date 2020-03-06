import React from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import { GACategory } from '../../../../../../utils/google-analytics';
import './Varsel.less';

type Props = {
    ikonSrc: string,
    datotid: string,
    melding: string,
    href: string,
    lenketekst: string
}

const classname = 'varsel';

export const Varsel = ({ ikonSrc, datotid, melding, href, lenketekst }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('container')}>
            <div className={cls.element('ikon-container')}>
                <img src={ikonSrc} alt={''} />
            </div>
            <div className={cls.element('innhold')}>
                <div className={cls.element('datotid')}>
                    {datotid}
                </div>
                <div className={cls.element('melding')}>
                    {melding}
                </div>
                <div className={cls.element('lenke')}>
                    <LenkeMedGA
                        href={href}
                        gaEventArgs={{
                            category: GACategory.Header,
                            action: 'varsel-lenke',
                            label: href,
                        }}
                    >
                        {lenketekst}
                    </LenkeMedGA>
                </div>
            </div>
        </div>
    );
};
