import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Close from '../../../../ikoner/varsler/Close';
import BEMHelper from '../../../../utils/bem';
import { Element } from 'nav-frontend-typografi';

interface Props {
    setMinimized: Dispatch<SetStateAction<boolean>>;
}
const UtloggingNavigasjon: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('utloggingsvarsel');
    const { setMinimized } = props;

    return (
        <nav className={cls.element('navigasjon')} aria-label="minimere og lukk varsel valg">
            <button
                className={cls.element('lukk')}
                onClick={() => {
                    document.body.style.overflow = 'initial';
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
