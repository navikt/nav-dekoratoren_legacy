import React from 'react';
import './MenySeksjoner.less';

export type MenyLayout = 'grid' | 'mosaic';

type Props = {
    numCols: number;
    layout: MenyLayout;
    children: React.ReactNode[];
};

export const MenySeksjoner = ({ numCols, layout, children }: Props) => {
    if (layout === 'grid') {
        return (
            <div
                className={'grid-meny'}
                style={{ '--numcols': numCols } as React.CSSProperties}
            >
                {children}
            </div>
        );
    } else if (layout === 'mosaic') {
        return (
            <div className={'mosaic-meny'}>
                {[...Array(numCols)].map((_, colIndex) => (
                    <div className={'mosaic-meny__column'} key={colIndex}>
                        {children.filter(
                            (_, index) => index % numCols === colIndex
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return null;
};
