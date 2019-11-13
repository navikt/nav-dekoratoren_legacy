import React from 'react';
import { mobileview } from '../../../../../api/api';
import MediaQuery from 'react-responsive';
import BEMHelper from '../../../../../utils/bem';

const Mobilbrakgrunn = ({
    toggleWindow,
    windowative,
}: {
    toggleWindow: () => void;
    windowative: boolean;
}) => {
    const cls = BEMHelper('mobilmeny');
    return (
        <MediaQuery maxWidth={mobileview - 1}>
            <div
                className={cls.element(
                    'mobilbackgrunn',
                    windowative ? 'active' : ''
                )}
                onClick={() => toggleWindow()}
            />
        </MediaQuery>
    );
};

export default Mobilbrakgrunn;
