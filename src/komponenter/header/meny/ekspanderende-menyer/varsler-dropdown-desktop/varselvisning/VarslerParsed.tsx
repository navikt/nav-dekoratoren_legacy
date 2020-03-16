import React from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import { GACategory } from '../../../../../../utils/google-analytics';
import {
    getKbId,
    NaviGroup,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';

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
    varsler: string;
};

const parseIkon = (ikonStr: string) => {
    const ikon = ikoner[ikonStr] || ikonDefaultPath;
    return (
        <div className={`varsel-ikon-row`}>
            <div className={`varsel-ikon-container ${ikonStr}`}>
                <img src={ikon} alt={''} className={`varsel-ikon`} />
            </div>
        </div>
    );
};

const parseLenke = (
    href: string | undefined,
    children: DomElement[] | undefined,
    index: number
) => {
    return (
        <LenkeMedGA
            href={href || ''}
            tabIndex={0}
            className={'varsel-lenke'}
            id={getKbId(NaviGroup.Varsler, { col: 0, row: 1, sub: index })}
            gaEventArgs={{
                category: GACategory.Header,
                action: 'varsel-lenke',
                label: href,
            }}
        >
            {children ? domToReact(children) : 'Lenke'}
        </LenkeMedGA>
    );
};

export const VarslerParsed = ({ varsler }: Props) => {
    let lenkeIndex = 0;
    const options = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (attribs?.class.includes('nav-varsler') && children) {
                return <div>{domToReact(children, options)}</div>;
            }

            if (attribs?.class.includes('varsel-ikon') && children) {
                const ikonStr =
                    (children[0] && children[0].data) || ikonDefault;
                return parseIkon(ikonStr);
            }

            if (name?.toLowerCase() === 'a') {
                return parseLenke(attribs?.href, children, lenkeIndex++);
            }
        },
    };

    const varslerParsed = htmlReactParser(varsler, options);

    return <>{varslerParsed}</>;
};
