import React from 'react';
import Navlogo from '../../../../../ikoner/meny/Navlogo';
import BEMHelper from '../../../../../../utils/bem';

interface Props {
    classname: string;
    lukkmeny: () => void;
    viewIndex: boolean;
}

const TopSeksjon = ({ classname, lukkmeny, viewIndex }: Props) => {
    const className = BEMHelper(classname);

    return (
        <div className={className.element('seksjon', 'top')}>
            <Navlogo />
            <div className={className.element('seksjon', 'closeButtonframe')}>
                <button
                    className={className.element(
                        'closeButton',
                        viewIndex ? '' : ' heartbeat'
                    )}
                    data-animation="beat-rotation"
                    data-remove="200"
                    onClick={() => lukkmeny()}
                />
            </div>
        </div>
    );
};

export default TopSeksjon;
