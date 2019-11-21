import React from 'react';
import Navlogo from '../../../../../../ikoner/meny/Navlogo';
import BEMHelper from '../../../../../../../utils/bem';
import './Toppseksjon.less';

interface Props {
    lukkmeny: () => void;
    viewIndex: boolean;
}

const TopSeksjon = ({ lukkmeny, viewIndex }: Props) => {
    const className = BEMHelper('mobilmeny');

    return (
        <div className={className.element('meny', 'top')}>
            <Navlogo />
            <div className={className.element('meny', 'lukkmeny-ramme')}>
                <button
                    className={className.element(
                        'lukkmeny-knapp',
                        viewIndex ? '' : ' heartbeat'
                    )}
                    data-animation="beat-rotation"
                    data-remove="200"
                    onClick={() => lukkmeny()}
                    tabIndex={viewIndex ? 0 : -1}
                />
            </div>
        </div>
    );
};

export default TopSeksjon;
