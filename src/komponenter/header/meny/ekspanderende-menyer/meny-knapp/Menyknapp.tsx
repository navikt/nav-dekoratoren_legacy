import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './Menyknapp.less';

interface Props {
    toggleMenu: () => void;
    clicked: boolean;
    children: React.ReactNode;
}

export const Menyknapp = (props: Props) => {
    const {toggleMenu, clicked, children} = props;
    const cls = BEMHelper('dropdown');

    return (
        <button
            onClick={toggleMenu}
            className={cls.element('menyknapp')}
            id={'decorator-meny-toggleknapp'}   // TODO: skill desktop/mobil her
            aria-label="Menyknapp"
            aria-haspopup="true"
            aria-controls={'dropdown-menu'}     // TODO: og her
            aria-expanded={clicked}
        >
            <div className={cls.element('menyknapp', 'innhold')}>
                {children}
            </div>
        </button>
    );
};

export default Menyknapp
