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
    minsideDropdownClassname: string;
    id: string;
};

export const MinsidePersonKnapp = (props: Props) => {
    const cls = BEMHelper(props.minsideDropdownClassname);

    return (
        <MenylinjeKnapp
            onClick={props.onClick}
            isOpen={props.isOpen}
            ariaControls={props.minsideDropdownClassname}
            classname={props.minsideDropdownClassname}
            id={props.id}
        >
            <MinsideIkon isOpen={props.isOpen} hasMenu={true} />
            <div className={cls.element('knapp-tekst')}>
                <div
                    className={`${cls.element('knapp-tekst-topp')} ${
                        props.isOpen
                            ? cls.element('knapp-tekst-topp', 'open')
                            : ''
                    }`}
                >
                    <Tekst id={'person-minside-lenke'} />
                </div>
                <div
                    className={`${cls.element('knapp-tekst-bunn')} ${
                        props.isOpen
                            ? cls.element('knapp-tekst-bunn', 'open')
                            : ''
                    }`}
                >
                    {props.brukerNavn}
                </div>
            </div>
        </MenylinjeKnapp>
    );
};

export default MinsidePersonKnapp;
