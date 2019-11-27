import React, { useState } from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import './Lukknapp.less';

interface Props {
    lukkvindu: () => void;
    tabindex: boolean;
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
            onKeyPress={() => lukkvindu()}
            tabIndex={props.tabindex ? 0 : -1}
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
