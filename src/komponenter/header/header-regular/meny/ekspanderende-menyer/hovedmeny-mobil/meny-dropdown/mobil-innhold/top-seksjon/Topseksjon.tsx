import React, { useState } from 'react';
import Navlogo from 'ikoner/meny/Navlogo';
import BEMHelper from 'utils/bem';
import { useDispatch } from 'react-redux';
import { lukkAlleDropdowns } from 'reducer/dropdown-toggle-duck';
import './Toppseksjon.less';

interface Props {
    tabindex: boolean;
}

const TopSeksjon = (props: Props) => {
    const dispatch = useDispatch();
    const className = BEMHelper('mobilmeny');
    const [heartbeat, setHeartbeat] = useState<boolean>(false);
    const setheartbeatOgLukkmeny = () => {
        setHeartbeat(true);
        dispatch(lukkAlleDropdowns());
    };

    return (
        <div className={className.element('meny', 'top')}>
            <Navlogo viewIndex={props.tabindex} />
            <div className={className.element('meny', 'lukkmeny-ramme')}>
                <button
                    className={className.element(
                        'lukkmeny-knapp',
                        heartbeat ? '' : ' heartbeat'
                    )}
                    data-animation="beat-rotation"
                    data-remove="200"
                    onClick={() => setheartbeatOgLukkmeny()}
                    tabIndex={props.tabindex ? 0 : -1}
                />
            </div>
        </div>
    );
};

export default TopSeksjon;
