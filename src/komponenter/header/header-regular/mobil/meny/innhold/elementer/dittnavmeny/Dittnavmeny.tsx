import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import Listelement from '../Listelement';
import { Next } from '@navikt/ds-icons';

interface Props {
    minsideLenker: MenyNode;
    openMeny: (event: React.MouseEvent<HTMLAnchorElement>, menyElement: MenyNode) => void;
    className: string;
}

const Dittnavmeny = (props: Props) => {
    const cls = BEMHelper(props.className);

    return (
        <ul className={cls.element('meny', 'minsidelist')}>
            {props.minsideLenker.children.map((menyElement: MenyNode, index: number) => (
                <Listelement className={cls.className} classElement="text-element" key={index}>
                    <a className="lenke" href="https://nav.no" onClick={(event) => props.openMeny(event, menyElement)}>
                        {menyElement.displayName}
                        <Next />
                    </a>
                </Listelement>
            ))}
        </ul>
    );
};

export default Dittnavmeny;
