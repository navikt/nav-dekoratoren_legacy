import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import Listelement from '../Listelement';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

interface Props {
    minsideLenker: MenyNode;
    openMeny: (
        event: React.MouseEvent<HTMLAnchorElement>,
        menyElement: MenyNode
    ) => void;
    className: string;
}

const Dittnavmeny = (props: Props) => {
    const cls = BEMHelper(props.className);

    return (
        <ul className={cls.element('meny', 'minsidelist')}>
            {props.minsideLenker.children.map(
                (menyElement: MenyNode, index: number) => (
                    <Listelement
                        className={cls.className}
                        classElement="text-element"
                    >
                        <a
                            className="lenke"
                            key={index}
                            href="https://nav.no"
                            onClick={(event) => props.openMeny(event, menyElement)}
                        >
                                {menyElement.displayName}
                                <HoyreChevron />
                        </a>
                    </Listelement>
                )
            )}
        </ul>
    );
};

export default Dittnavmeny;
