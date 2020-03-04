import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import MinsideIkon from './ikon/MinsideIkon';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Tekst from '../../../../../tekster/finn-tekst';
import MenylinjeKnapp from '../MenylinjeKnapp';
import './MinsideKnapper.less';

type Props = {
    toggleMenu: () => void;
    isOpen: boolean;
    brukerNavn: string;
    classname: string;
    ariaLabel: string;
}

export const MinsidePersonKnapp = (props: Props) => {
    const { toggleMenu, isOpen, classname, ariaLabel, brukerNavn } = props;
    const cls = BEMHelper(classname);

    return (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            classname={classname}
            ariaLabel={ariaLabel}
        >
            <MinsideIkon isOpen={isOpen} hasMenu={true} />
            <div className={cls.element('knapp-tekst')}>
                <Normaltekst className={cls.element('knapp-tekst-topp')}>
                    <Tekst id={'person-minside-lenke'} />
                </Normaltekst>
                <Undertekst className={cls.element('knapp-tekst-bunn')}>
                    {brukerNavn}
                </Undertekst>
            </div>
        </MenylinjeKnapp>
    );
};

export default MinsidePersonKnapp;
