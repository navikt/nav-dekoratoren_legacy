import React from 'react';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../../utils/bem';
import TopSeksjon from './top-seksjon/Topseksjon';
import Lukkundermeny from './Lukkundermeny';
import Listelement from './Listelement';

interface Props {
    className: string;
    clicked: boolean;
    lukkMenyene: () => void;
    lukkMeny: () => void;
    tabindex: boolean;
    lenker: MenySeksjon;
}

const Undermeny = (props: Props) => {
    const {
        className,
        clicked,
        lukkMenyene,
        lukkMeny,
        tabindex,
        lenker,
    } = props;
    const menyClass = BEMHelper(className);
    return (
        <section
            className={menyClass.element(
                'undermeny-innhold',
                clicked ? 'active' : ''
            )}
        >
            <TopSeksjon lukkmeny={lukkMenyene} tabindex={props.tabindex} />

            <Lukkundermeny
                lukkundermeny={lukkMeny}
                className={menyClass.className}
                tabindex={props.tabindex}
            />
            <ul className={menyClass.element('meny', 'list')}>
                {lenker.children.map((lenke, index: number) => {
                    return (
                        <Lenke
                            href={lenke.path}
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
        </section>
    );
};

export default Undermeny;
