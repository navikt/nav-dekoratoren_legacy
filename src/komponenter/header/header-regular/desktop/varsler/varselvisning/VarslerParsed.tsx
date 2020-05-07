import React from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

const ikonDefault = 'alarm-ikon';
const ikonDefaultPath = require('ikoner/varsler/alarm.svg');
const ikoner: { [str: string]: string } = {
    'alarm-ikon': ikonDefaultPath,
    'kalender-ikon': require('ikoner/varsler/calendar-3.svg'),
    'snakkeboble-ikon': require('ikoner/varsler/bubble-chat-2.svg'),
    'dokument-ikon': require('ikoner/varsler/file-new-1.svg'),
    'plaster-ikon': require('ikoner/varsler/first-aid-plaster.svg'),
};

type Props = {
    varsler: string;
    rowIndex: number;
};

const parseIkon = (ikonStr: string) => {
    const ikon = ikoner[ikonStr] || ikonDefaultPath;
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    return (
        <div className={`varsel-ikon-row`}>
            <div className={`varsel-ikon-container ${ikonStr}`}>
                <img
                    alt={'varsel-ikon'}
                    src={`${XP_BASE_URL}${ikon}`}
                    className={`varsel-ikon`}
                />
            </div>
        </div>
    );
};

const parseLenke = (
    href: string | undefined,
    children: DomElement[] | undefined,
    rowIndex: number,
    subIndex: number
) => {
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );
    return (
        <LenkeMedGA
            href={href || ''}
            tabIndex={0}
            className={'varsel-lenke'}
            id={getKbId(KbNavGroup.Varsler, {
                col: 0,
                row: rowIndex,
                sub: subIndex,
            })}
            gaEventArgs={{
                context: arbeidsflate,
                category: GACategory.Header,
                action: 'varsel-lenke',
                label: href,
            }}
        >
            {children ? domToReact(children) : 'Lenke'}
        </LenkeMedGA>
    );
};

export const VarslerParsed = ({ varsler, rowIndex }: Props) => {
    let lenkeIndex = 0;
    const options = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (attribs?.class.includes('nav-varsler') && children) {
                return <div>{domToReact(children, options)}</div>;
            }

            if (attribs?.class.includes('varsel-liste') && children) {
                return <ul>{domToReact(children, options)}</ul>;
            }

            if (attribs?.class.includes('varsel-container') && children) {
                return (
                    <li className={'dekorator-varsel-container'}>
                        {domToReact(children, options)}
                    </li>
                );
            }

            if (attribs?.class === 'varsel' && children) {
                return (
                    <section className={'dekorator-varsel'}>
                        {domToReact(children, options)}
                    </section>
                );
            }

            if (attribs?.class.includes('varsel-ikon') && children) {
                const ikonStr =
                    (children[0] && children[0].data) || ikonDefault;
                return parseIkon(ikonStr);
            }

            if (name?.toLowerCase() === 'a') {
                return parseLenke(
                    attribs?.href,
                    children,
                    rowIndex,
                    lenkeIndex++
                );
            }
        },
    };

    const varslerParsed = htmlReactParser(varsler, options);

    return <>{varslerParsed}</>;
};
