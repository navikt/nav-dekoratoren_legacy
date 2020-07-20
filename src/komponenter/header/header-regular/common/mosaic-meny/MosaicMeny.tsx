import React from 'react';
import './MosaicMeny.less';

type Props = {
    numCols: number;
    children: React.ReactNode[];
};

export const MosaicMeny = ({ numCols, children }: Props) => {
    return (
        <div className={'mosaic-meny'}>
            {[...Array(numCols)].map((_, colIndex) => (
                <div className={'mosaic-meny__column'} key={colIndex}>
                    {children.filter(
                        (child, index) => index % numCols === colIndex
                    )}
                </div>
            ))}
        </div>
    );
};
