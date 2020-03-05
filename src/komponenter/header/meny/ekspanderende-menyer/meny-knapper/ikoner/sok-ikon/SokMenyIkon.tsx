import React from 'react';
import './SokMenyIkon.less';
import BEMHelper from '../../../../../../../utils/bem';

type Props = {
    isOpen: boolean;
};

export const SokMenyIkon = ({ isOpen }: Props) => {
    const cls = BEMHelper('sok-meny-ikon');

    return (
        <div className={cls.element('container')}>
            <div className={cls.element('circle', isOpen ? 'open' : '')} />
            <div className={cls.element('line', isOpen ? 'open' : '')} />
            <div className={cls.element('line-x', isOpen ? 'open' : '')} />
        </div>
    );
};

export default SokMenyIkon;
