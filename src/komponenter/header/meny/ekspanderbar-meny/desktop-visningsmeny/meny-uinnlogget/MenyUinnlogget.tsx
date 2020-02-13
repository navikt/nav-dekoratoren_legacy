import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import Toppseksjon from './topp-seksjon/Toppseksjon';
import BunnSeksjon from './bunn-seksjon/BunnSeksjon';
import './MenyUinnlogget.less';
import { MenyUinnloggedHovedseksjon } from './hoved-seksjon/Hovedseksjon';

interface Props {
    classname: string;
    menyLenker: MenySeksjon;
    isOpen: boolean;
}

const numCols = 3;

type LinkCoord = {
    x: number,
    y: number
}

const MenyUinnlogget = (props: Props) => {
    const { classname, menyLenker, isOpen } = props;
    const cls = BEMHelper(classname);

    // TODO: finn nåværende focus-element
    const [selectedLink, setSelectedLink] = useState<LinkCoord>({x: 1, y: 1});

    useEffect(() => {
        const keyHandler = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                setSelectedLink({x: Math.max(selectedLink.x, 1), y: selectedLink.y})
            } else if (event.key === 'ArrowDown') {
                setSelectedLink({x: Math.min(selectedLink.x, numCols), y: selectedLink.y})
            } else if (event.key === 'ArrowLeft') {
                setSelectedLink({x: selectedLink.x, y: Math.max(1, selectedLink.y)})
            } else if (event.key === 'ArrowRight') {
                setSelectedLink({x: selectedLink.x, y: Math.min(0, selectedLink.y)})
            } else {
                return;
            }
        };

        if (isOpen) {
            window.document.addEventListener('keydown', keyHandler);
            return () => {
                window.document.removeEventListener('keydown', keyHandler);
            };
        }
    }, [isOpen]);

    return (
        <div className={cls.element('meny-uinnlogget')}>
            <Toppseksjon
                classname={classname}
                arbeidsflate={menyLenker.displayName}
            />
            <MenyUinnloggedHovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <BunnSeksjon
                classname={classname}
            />
        </div>
    );
};

export default MenyUinnlogget;
