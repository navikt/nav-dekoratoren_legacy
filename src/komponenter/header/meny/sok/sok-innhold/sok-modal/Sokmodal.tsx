import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import BEMHelper from '../../../../../../utils/bem';
import Modal from 'nav-frontend-modal';
import './Sokmodal.less';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';

import Sok from '../../Sok';
import Navlogo from '../../../../../ikoner/meny/Navlogo';
import Lukknapp from './sok-modal-knapp/Lukknapp';

interface Props {
    modalerApen: boolean;
    sokekappToggle: () => void;
}

if (typeof window !== 'undefined') {
    Modal.setAppElement('body');
}

const cls = BEMHelper('sok-modal');

const SokModal = (props: Props) => {
    return (
        <>
            <ModalWrapper
                isOpen={props.modalerApen}
                contentLabel={'mobilt sokefelt for nav.no'}
                onRequestClose={() => props.sokekappToggle()}
                className="sok-modal-body"
            >
                <div className={cls.className}>
                    <div className={cls.element('logo')}>
                        <Navlogo color="white" viewIndex={props.modalerApen} />
                    </div>
                    <div className={cls.element('lukknapp')}>
                        <Lukknapp
                            lukkvindu={props.sokekappToggle}
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
        </>
    );
};

export default SokModal;
