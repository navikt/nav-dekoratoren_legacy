import React from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { Varsel } from './Varsel';

const ikonDefault = require('../../../../../../ikoner/varsler/alarm.svg');
const ikoner: { [str: string]: string } = {
    'alarm-ikon': ikonDefault,
    'kalender-ikon': require('../../../../../../ikoner/varsler/calendar-3.svg'),
    'snakkeboble-ikon': require('../../../../../../ikoner/varsler/bubble-chat-2.svg'),
    'dokument-ikon': require('../../../../../../ikoner/varsler/file-new-1.svg'),
    'plaster-ikon': require('../../../../../../ikoner/varsler/first-aid-plaster.svg'),
};

type Props = {
    varsler: string
}

const getIkonFromVarselChildren = (elements: DomElement[] | undefined) => {
    const ikonData = elements?.find(e => e.attribs?.class.includes('varsel-ikon'))?.children;
    const ikonStr = ikonData && ikonData[0].data;

    return ikoner[ikonStr] || ikonDefault;
};

export const VarslerParsed = ({ varsler }: Props) => {
    const varslerParsed = htmlReactParser(varsler, {
        replace: ({ attribs, children }) => {

            console.log('searching');
            // if (attribs?.class.includes('nav-varsler') && children) {
            //     console.log('found!');
            //     return <>{domToReact(children)}</>;
            // }

            if (attribs?.class === 'varsel') {
                console.log('found!', children);
                return (
                    <Varsel
                        ikonSrc={getIkonFromVarselChildren(children)}
                        datotid={''}
                        melding={''}
                        href={''}
                        lenketekst={''}
                    />
                );
            }
        },
    });

    return <>{varslerParsed}</>;
};
