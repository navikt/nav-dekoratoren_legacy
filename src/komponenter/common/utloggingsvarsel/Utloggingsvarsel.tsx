import React, { FunctionComponent, useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import ModalWrapper from 'nav-frontend-modal';
import './utloggingsvarsel.less';
import './utloggingsmodal-transition.less';
import { getSelvbetjeningIdtoken, parseJwt } from './token.utils';
import { checkTimeStampAndSetTimeStamp } from './timestamp.utils';
import ResizeHandler, { BREAKPOINT, WindowType } from './komponenter/ResizeHandler';
import { verifyWindowObj } from '../../../utils/Environment';
import UtloggingsvarselInnhold from './komponenter/UtloggingsvarselInnhold';
import { AppState } from '../../../store/reducers';
import { useSelector } from 'react-redux';

const stateSelector = (state: AppState) => ({
    utloggingsvarsel: state.environment.PARAMS.UTLOGGINGSVARSEL
});

const Utloggingsvarsel: FunctionComponent = () => {
    const { utloggingsvarsel } = useSelector(stateSelector);
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
        if (utloggingsvarsel && token) {
            try {
                const jwt = parseJwt(token);
                const timestamp = jwt['exp'];
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
        <div id='utloggingsvarsel' className={cls.className + ` ${setOpenClsName()}`}>
            <ModalWrapper
                parentSelector={modalMountPoint}
                onRequestClose={toggleModal}
                contentLabel='varsel for utløpende sesjon av innlogget bruker'
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
