import React from 'react';
import BEMHelper from 'utils/bem';
import './HodeKroppIkon.less';

type Props = {
    isOpen?: boolean;
};

export const HodeKroppIkon = ({ isOpen = false }: Props) => {
    const cls = BEMHelper('hode-kropp-ikon');

    return (
        <div
            className={`${cls.className} ${
                isOpen ? `${cls.className}--open` : ''
            }`}
        >
            <div
                className={`${cls.element('hode')} ${
                    isOpen ? cls.element('hode', 'open') : ''
                }`}
            />
            <div
                className={`${cls.element('kropp')} ${
                    isOpen ? cls.element('kropp', 'open') : ''
                }`}
            />
        </div>
    );
};

export default HodeKroppIkon;
