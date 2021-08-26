import React, { FunctionComponent, useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import ModalWrapper from 'nav-frontend-modal';
import './utloggingsvarsel.less';
import './utloggingsmodal-transition.less';
import { checkTimeStampAndSetTimeStamp, getCurrentTimeStamp, timeStampIkkeUtgatt } from './timestamp.utils';
import ResizeHandler, { BREAKPOINT, WindowType } from './komponenter/ResizeHandler';
import { verifyWindowObj } from '../../../utils/Environment';
import UtloggingsvarselInnhold from './komponenter/UtloggingsvarselInnhold';
import { AppState } from '../../../store/reducers';
import { useSelector } from 'react-redux';
import { useInterval } from './useInterval';
import { getLogOutUrl } from 'utils/login';

const stateSelector = (state: AppState) => ({
    utloggingsvarsel: state.environment.PARAMS.UTLOGGINGSVARSEL,
    timestamp: state.environment.PARAMS.TIMESTAMP,
    environment: state.environment,
});

const Utloggingsvarsel: FunctionComponent = () => {
    const { utloggingsvarsel, timestamp, environment } = useSelector(stateSelector);
    const cls = BEMHelper('utloggingsvarsel');
    const windowOnMount = () =>
        verifyWindowObj() && window.innerWidth > BREAKPOINT ? WindowType.DESKTOP : WindowType.MOBILE;

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [unixTimeStamp, setUnixTimestamp] = useState<number>(0);
    const [minimized, setMinimized] = useState<boolean>(false);
    const [windowType, setWindowType] = useState<WindowType>(windowOnMount());
    const [interval, setInterval] = useState<boolean>(timeStampIkkeUtgatt(unixTimeStamp - getCurrentTimeStamp()));
    const [tid, setTid] = useState<string>('- minutter');
    const [vistSistePaminnelse, setVistSistePaminnelse] = useState<boolean>(false);
    const [overskrift, setOverskrift] = useState<string>('Du blir snart logget ut');
    const setOpenClsName = (): string => (minimized ? '' : 'open');
    const toggleModal = (): void => setModalOpen((prevState) => !prevState);
    const modalMountPoint = (): HTMLElement => document.getElementById('utloggingsvarsel') ?? document.body;

    useEffect(() => {
        const setModalElement = () => (document.getElementById('sitefooter') ? '#sitefooter' : 'body');
        ModalWrapper.setAppElement(setModalElement());
        if (utloggingsvarsel && timestamp) {
            try {
                checkTimeStampAndSetTimeStamp(timestamp, setModalOpen, setUnixTimestamp);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    useEffect(() => {
        setInterval(timeStampIkkeUtgatt(unixTimeStamp - getCurrentTimeStamp()));
    }, [unixTimeStamp]);

    useInterval(
        () => {
            const tokenExpire = unixTimeStamp - getCurrentTimeStamp();
            if (timeStampIkkeUtgatt(getCurrentTimeStamp() - unixTimeStamp + 1)) {
                setInterval(false);
                window.location.href = getLogOutUrl(environment);
            }

            if (tokenExpire <= 60) {
                if (!vistSistePaminnelse) {
                    setVistSistePaminnelse(true);
                    modalOpen ? setMinimized(false) : setModalOpen(true);
                }
                setTid(`${Math.floor(tokenExpire)} sekunder`);
                setOverskrift('Nå blir du logget ut');
            } else {
                const min: number = Math.floor(tokenExpire / 60) + 1;
                setTid(`${min} minutter`);
            }
        },
        interval ? 1000 : null
    );

    ResizeHandler({ setWindowType, windowType });

    return (
        <div id="utloggingsvarsel" className={cls.className + ` ${setOpenClsName()}`}>
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
                    minimized={minimized}
                    windowType={windowType}
                    overskrift={overskrift}
                    tid={tid}
                />
            </ModalWrapper>
        </div>
    );
};

export default Utloggingsvarsel;
