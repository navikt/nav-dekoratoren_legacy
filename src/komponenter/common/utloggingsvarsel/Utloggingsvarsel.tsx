import React, { FunctionComponent, useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import ModalWrapper from 'nav-frontend-modal';
import './utloggingsvarsel.less';
import './utloggingsmodal-transition.less';
import { getSelvbetjeningIdtoken } from './token.utils';
import { checkTimeStampAndSetTimeStamp } from './timestamp.utils';
import ResizeHandler, { BREAKPOINT, WindowType } from './komponenter/ResizeHandler';
import { verifyWindowObj } from '../../../utils/Environment';
import UtloggingsvarselInnhold from './komponenter/UtloggingsvarselInnhold';

const Utloggingsvarsel: FunctionComponent = () => {
    const cls = BEMHelper('utloggingsvarsel');
    const windowOnMount = () =>
        verifyWindowObj() && window.innerWidth > BREAKPOINT ? WindowType.DESKTOP : WindowType.MOBILE;

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [unitTimeStamp, setUnixTimestamp] = useState<number>(0);
    const [minimized, setMinimized] = useState<boolean>(false);
    const [windowType, setWindowType] = useState<WindowType>(windowOnMount());
    const setOpenClsName = (): string => (minimized ? '' : 'open');
    const toggleModal = (): void => setModalOpen((prevState) => !prevState);
    const modalMountPoint = (): HTMLElement => document.getElementById('utloggingsvarsel') ?? document.body;

    useEffect(() => {
        const setModalElement = () => (document.getElementById('sitefooter') ? '#sitefooter' : 'body');
        ModalWrapper.setAppElement(setModalElement());

        const token = getSelvbetjeningIdtoken();
        if (token || true) {
            try {
                // const jwt = parseJwt(token);
                // const timestamp = jwt['exp'];
                const timestamp = 1622814648;
                if (timestamp) {
                    checkTimeStampAndSetTimeStamp(timestamp, setModalOpen, setUnixTimestamp);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    ResizeHandler({ setWindowType, windowType });

    return (
        <div id="utloggingsvarsel" className={cls.className + ` ${setOpenClsName()}`}>
            <button onClick={() => setModalOpen((prevState) => !prevState)}>click me!</button>
            <ModalWrapper
                parentSelector={modalMountPoint}
                onRequestClose={toggleModal}
                contentLabel="varsel for utløpende sesjon av innlogget bruker"
                isOpen={modalOpen}
                className={cls.element('modal')}
                closeButton={false}
            >
                <UtloggingsvarselInnhold
                    setModalOpen={setModalOpen}
                    setMinimized={setMinimized}
                    modalOpen={modalOpen}
                    minimized={minimized}
                    timestamp={unitTimeStamp}
                    windowType={windowType}
                />
            </ModalWrapper>
        </div>
    );
};

export default Utloggingsvarsel;
