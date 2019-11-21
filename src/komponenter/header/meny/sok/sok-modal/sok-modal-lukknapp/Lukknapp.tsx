import React, { useState } from 'react';
import './Lukknapp.less';
import BEMHelper from '../../../../../../utils/bem';

interface Props {
    lukkvindu: () => void;
}

const Lukknapp = (props: Props) => {
    const cls = BEMHelper('lukk-container');
    const [closeAnimation, setCloseAnimation] = useState<boolean>(false);

    const lukkvindu = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            props.lukkvindu();
        }, 500);
    };

    return (
        <div
            className={cls.className}
            role="button"
            onClick={() => lukkvindu()}
        >
            <div
                className={cls.element(
                    'venstreside',
                    closeAnimation ? 'flip' : ''
                )}
            />
            <div
                className={cls.element(
                    'hoyreside',
                    closeAnimation ? 'flip' : ''
                )}
            />
            <label className="close">LUKK</label>
        </div>
    );
};

export default Lukknapp;
