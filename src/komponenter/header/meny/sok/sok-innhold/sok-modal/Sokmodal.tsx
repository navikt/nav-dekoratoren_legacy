import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Modal from 'nav-frontend-modal';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import BEMHelper from '../../../../../../utils/bem';
import Navlogo from '../../../../../ikoner/meny/Navlogo';
import Lukknapp from './sok-modal-knapp/Lukknapp';
import Sok from '../../Sok';
import './Sokmodal.less';

interface Props {
    modalerApen: boolean;
    sokeknappToggle: () => void;
}

if (typeof window !== 'undefined') {
    Modal.setAppElement(
        document.getElementById('decorator-header')
            ? '#decorator-header'
            : 'body'
    );
}

const cls = BEMHelper('sok-modal');

const SokModal = (props: Props) => {
    return (
        <ModalWrapper
            isOpen={props.modalerApen}
            contentLabel={'mobilt sokefelt for nav.no'}
            onRequestClose={() => props.sokeknappToggle()}
            className="sok-modal-body"
        >
            <div className={cls.className}>
                <div className={cls.element('logo')}>
                    <Navlogo color="white" viewIndex={props.modalerApen} />
                </div>
                <div className={cls.element('lukknapp')}>
                    <Lukknapp
                        lukkvindu={props.sokeknappToggle}
                        tabindex={props.modalerApen}
                    />
                </div>
                <div className={cls.element('veiledende-tekst')}>
                    <Innholdstittel>Hva leter du etter?</Innholdstittel>
                </div>
                <div className={cls.element('sokefelt')}>
                    <Sok />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default SokModal;
