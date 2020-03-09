import React from 'react';
import htmlReactParser from 'html-react-parser';

const ikonDefault = 'alarm-ikon';
const ikonDefaultPath = require('../../../../../../ikoner/varsler/alarm.svg');
const ikoner: { [str: string]: string } = {
    'alarm-ikon': ikonDefaultPath,
    'kalender-ikon': require('../../../../../../ikoner/varsler/calendar-3.svg'),
    'snakkeboble-ikon': require('../../../../../../ikoner/varsler/bubble-chat-2.svg'),
    'dokument-ikon': require('../../../../../../ikoner/varsler/file-new-1.svg'),
    'plaster-ikon': require('../../../../../../ikoner/varsler/first-aid-plaster.svg'),
};

type Props = {
    varsler: string
}

export const VarslerParsed = ({ varsler }: Props) => {
    const varslerParsed = htmlReactParser(varsler, {
        replace: ({ attribs, children }) => {
            if (attribs?.class.includes('varsel-ikon') && children) {
                const ikonStr = children[0] && children[0].data || ikonDefault;
                const ikon = ikoner[ikonStr] || ikonDefaultPath;
                return (
                    <div className={`varsel-ikon-row`}>
                        <div className={`varsel-ikon-container ${ikonStr}`}>
                            <img src={ikon} alt={''} className={`varsel-ikon`} />
                        </div>
                    </div>
                );
            }
        },
    });

    return <>{varslerParsed}</>;
};
