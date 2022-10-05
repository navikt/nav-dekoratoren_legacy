import React from 'react';
import style from './MenySeksjoner.module.scss';

export type MenyLayout = 'grid' | 'mosaic';

type Props = {
    numCols: number;
    layout: MenyLayout;
    children: React.ReactNode[];
};

export const MenySeksjoner = ({ numCols, layout, children }: Props) => {
    if (layout === 'grid') {
        return (
            <div className={style.gridMeny} style={{ '--numcols': numCols } as React.CSSProperties}>
                {children}
            </div>
        );
    } else if (layout === 'mosaic') {
        return (
            <div className={style.mosaicMeny}>
                {[...Array(numCols)].map((_, colIndex) => (
                    <div className={style.mosaicMenyColumn} key={colIndex}>
                        {children.filter((_, index) => index % numCols === colIndex)}
                    </div>
                ))}
            </div>
        );
    }

    return null;
};
