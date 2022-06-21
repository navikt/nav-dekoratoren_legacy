import React from 'react';
import BEMHelper from 'utils/bem';
import './SokIkon.less';

type Props = {
    isOpen: boolean;
};

export const SokIkon = ({ isOpen }: Props) => {
    const cls = BEMHelper('sok-ikon');

    return (
        <span className={`${cls.className}${isOpen ? ` ${cls.className}--open` : ''}`}>
            <span className={cls.element('circle', isOpen ? 'open' : '')} />
            <span className={cls.element('line', isOpen ? 'open' : '')} />
            <span className={cls.element('line-x', isOpen ? 'open' : '')} />
        </span>
    );
};

export default SokIkon;
