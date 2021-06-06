import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Close from '../../../../ikoner/varsler/Close';
import BEMHelper from '../../../../utils/bem';
import { Element } from 'nav-frontend-typografi';

interface Props {
    setMinimized: Dispatch<SetStateAction<boolean>>;
    minimized: boolean;
}
const UtloggingNavigasjon: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('utloggingsvarsel');
    const { setMinimized, minimized } = props;

    return (
        <nav className={cls.element('navigasjon')} aria-label="minimere og lukk varsel valg">
            <button
                className={cls.element('lukk')}
                tabIndex={minimized ? -1 : 0}
                onClick={() => {
                    document.body.style.overflow = 'initial';
                    document.body.setAttribute("aria-hidden", "false");
                    setMinimized((prevState) => !prevState);
                }}
                aria-label="lukk modalen"
            >
                <Element>Lukk</Element>
                <Close width="1.5rem" height="1.5rem" />
            </button>
        </nav>
    );
};
export default UtloggingNavigasjon;
