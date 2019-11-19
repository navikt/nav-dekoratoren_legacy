import React from 'react';
import { mobileview } from '../../../../../api/api';
import MediaQuery from 'react-responsive';
import BEMHelper from '../../../../../utils/bem';

const Mobilbakgrunn = ({
    toggleWindow,
    backgroundIsActive,
}: {
    toggleWindow: () => void;
    backgroundIsActive: boolean;
}) => {
    const cls = BEMHelper('mobilmeny');
    return (
        <MediaQuery maxWidth={mobileview - 1}>
            <div
                className={cls.element(
                    'mobilbakgrunn',
                    backgroundIsActive ? 'active' : ''
                )}
                onClick={() => toggleWindow()}
            />
        </MediaQuery>
    );
};

export default Mobilbakgrunn;
