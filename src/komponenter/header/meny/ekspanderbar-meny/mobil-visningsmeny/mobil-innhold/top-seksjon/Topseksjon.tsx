import React from 'react';
import Navlogo from '../../../../../../ikoner/meny/Navlogo';
import BEMHelper from '../../../../../../../utils/bem';
import './Toppseksjon.less';

interface Props {
    lukkmeny: () => void;
    tabindex: boolean;
}

const TopSeksjon = (props: Props) => {
    const className = BEMHelper('mobilmeny');

    return (
        <div className={className.element('meny', 'top')}>
            <Navlogo viewIndex={props.tabindex} />
            <div className={className.element('meny', 'lukkmeny-ramme')}>
                <button
                    className={className.element(
                        'lukkmeny-knapp',
                        props.tabindex ? '' : ' heartbeat'
                    )}
                    data-animation="beat-rotation"
                    data-remove="200"
                    onClick={() => props.lukkmeny()}
                    tabIndex={props.tabindex ? 0 : -1}
                />
            </div>
        </div>
    );
};

export default TopSeksjon;
