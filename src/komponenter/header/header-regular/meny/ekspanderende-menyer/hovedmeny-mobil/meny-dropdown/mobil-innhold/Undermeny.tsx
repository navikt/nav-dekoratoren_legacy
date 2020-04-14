import React from 'react';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { MenyNode } from '../../../../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../../../../utils/bem';
import Lukkundermeny from './Lukkundermeny';
import Listelement from './Listelement';
import { genererUrl } from '../../../../../../../../utils/Environment';
import { Systemtittel } from 'nav-frontend-typografi';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../reducer/reducers';

interface Props {
    className: string;
    undermenyIsOpen: boolean;
    setFocusNode: () => void;
    tabindex: boolean;
    lenker: MenyNode;
}

const Undermeny = (props: Props) => {
    const { setFocusNode, tabindex, lenker } = props;
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { className, undermenyIsOpen } = props;
    const menyClass = BEMHelper(className);

    const arbeidsflate = lenker.displayName
        .charAt(0)
        .toUpperCase()
        .concat(lenker.displayName.slice(1).toLowerCase());

    return (
        <section
            className={menyClass.element(
                'undermeny-innhold',
                undermenyIsOpen ? 'active' : ''
            )}
        >
            <Lukkundermeny
                setFocusIndex={setFocusNode}
                className={menyClass.className}
                tabindex={props.tabindex}
            />
            <Systemtittel
                className={menyClass.element('undermeny-arbeidsflate')}
            >
                {arbeidsflate}
            </Systemtittel>
            <ul className={menyClass.element('meny', 'list')}>
                {lenker.children.map((lenke, index: number) => {
                    return (
                        <Lenke
                            href={genererUrl(XP_BASE_URL, lenke.path)}
                            key={index}
                            tabIndex={tabindex ? 0 : -1}
                        >
                            <Listelement
                                className={menyClass.className}
                                classElement="text-element-undermeny"
                            >
                                <div
                                    className={menyClass.element(
                                        'undermeny-chevron'
                                    )}
                                >
                                    <HoyreChevron />
                                </div>
                                {lenke.displayName}
                            </Listelement>
                        </Lenke>
                    );
                })}
            </ul>
            <div className={menyClass.element('blokk-divider')}>
                <Lukkundermeny
                    setFocusIndex={setFocusNode}
                    className={menyClass.className}
                    tabindex={props.tabindex}
                />
            </div>
        </section>
    );
};

export default Undermeny;
