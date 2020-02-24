import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './Menyknapp.less';

interface Props {
    toggleMenu: () => void;
    clicked: boolean;
    ariaControlsId: string;
    id?: string;
    children: React.ReactNode;
}

export const Menyknapp = (props: Props) => {
    const {toggleMenu, clicked, ariaControlsId, id, children} = props;
    const cls = BEMHelper('dropdown');

    return (
        <button
            onClick={toggleMenu}
            className={cls.element('menyknapp')}
            id={id}
            aria-label="Menyknapp"
            aria-haspopup="true"
            aria-controls={ariaControlsId}
            aria-expanded={clicked}
        >
            <div className={cls.element('menyknapp', 'innhold')}>
                {children}
            </div>
        </button>
    );
};

export default Menyknapp
