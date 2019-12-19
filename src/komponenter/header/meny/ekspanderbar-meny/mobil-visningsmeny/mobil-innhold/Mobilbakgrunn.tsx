import React from 'react';
import BEMHelper from '../../../../../../utils/bem';

const Mobilbakgrunn = ({
    toggleWindow,
    backgroundIsActive,
}: {
    toggleWindow: () => void;
    backgroundIsActive: boolean;
}) => {
    const cls = BEMHelper('mobilmeny');
    return (
        <div className="media-mobil-tablet">
            <div
                className={cls.element(
                    'mobilbakgrunn',
                    backgroundIsActive ? 'active' : ''
                )}
                onClick={() => toggleWindow()}
            />
        </div>
    );
};

export default Mobilbakgrunn;
