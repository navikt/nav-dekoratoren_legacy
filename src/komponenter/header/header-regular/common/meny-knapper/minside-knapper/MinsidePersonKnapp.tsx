import React from 'react';
import BEMHelper from 'utils/bem';
import MinsideIkon from '../ikoner/minside-ikon/MinsideIkon';
import Tekst from 'tekster/finn-tekst';
import MenylinjeKnapp from '../MenylinjeKnapp';
import './MinsideKnapper.less';

type Props = {
    onClick: () => void;
    isOpen: boolean;
    brukerNavn: string;
    classname: string;
    id: string;
    ariaLabel: string;
};

export const MinsidePersonKnapp = (props: Props) => {
    const { onClick, isOpen, classname, id, ariaLabel, brukerNavn } = props;
    const cls = BEMHelper(classname);

    return (
        <MenylinjeKnapp
            onClick={onClick}
            isOpen={isOpen}
            classname={classname}
            id={id}
            ariaLabel={ariaLabel}
        >
            <MinsideIkon isOpen={isOpen} hasMenu={true} />
            <div className={cls.element('knapp-tekst')}>
                <div
                    className={`${cls.element('knapp-tekst-topp')} ${
                        isOpen ? cls.element('knapp-tekst-topp', 'open') : ''
                    }`}
                >
                    <Tekst id={'person-minside-lenke'} />
                </div>
                <div
                    className={`${cls.element('knapp-tekst-bunn')} ${
                        isOpen ? cls.element('knapp-tekst-bunn', 'open') : ''
                    }`}
                >
                    {brukerNavn}
                </div>
            </div>
        </MenylinjeKnapp>
    );
};

export default MinsidePersonKnapp;
