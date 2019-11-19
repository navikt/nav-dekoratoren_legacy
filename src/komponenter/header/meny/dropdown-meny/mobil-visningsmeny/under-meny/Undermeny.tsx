import React from 'react';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../../utils/bem';
import Lukkundermeny from '../lukk-undermeny/Lukkundermeny';
import TopSeksjon from '../top-seksjon/Topseksjon';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Listelement from '../liste-element/Listelement';

interface Props {
    className: string;
    clicked: boolean;
    lukkMenyene: () => void;
    lukkMeny: () => void;
    viewIndex: boolean;
    lenker: MenySeksjon;
}

const Undermeny = (props: Props) => {
    const {
        className,
        clicked,
        lukkMenyene,
        lukkMeny,
        viewIndex,
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
            <TopSeksjon lukkmeny={lukkMenyene} viewIndex={clicked} />

            <Lukkundermeny
                lukkundermeny={lukkMeny}
                className={menyClass.className}
                viewindex={viewIndex}
            />
            <ul className={menyClass.element('meny', 'list')}>
                {lenker.children.map((lenke, index: number) => {
                    return (
                        <Lenke
                            href={lenke.path}
                            key={index}
                            tabIndex={viewIndex ? 0 : -1}
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
