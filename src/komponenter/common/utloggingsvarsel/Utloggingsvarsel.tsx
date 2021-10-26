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
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from './useInterval';
import { getLogOutUrl } from 'utils/login';
import {
    utloggingsvarselOppdatereStatus,
    UtloggingsvarselState,
    VarselEkspandert
} from '../../../store/reducers/utloggingsvarsel-duck';
import { useCookies } from 'react-cookie';
import { CookieName, cookieOptions } from '../../../server/cookieSettings';

const stateSelector = (state: AppState) => ({
    utlogginsvarsel: state.utlogginsvarsel,
    utloggingsvarselOnsket: state.environment.PARAMS.UTLOGGINGSVARSEL,
    environment: state.environment
});

const Utloggingsvarsel: FunctionComponent = () => {
    const { utloggingsvarselOnsket, environment, utlogginsvarsel } = useSelector(stateSelector);
    const [cookie, setCookie] = useCookies();
    const dispatch = useDispatch();
    const cls = BEMHelper('utloggingsvarsel');
    const windowOnMount = () =>
        verifyWindowObj() && window.innerWidth > BREAKPOINT ? WindowType.DESKTOP : WindowType.MOBILE;

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [unixTimeStamp, setUnixTimestamp] = useState<number>(0);
    const [windowType, setWindowType] = useState<WindowType>(windowOnMount());
    const [interval, setInterval] = useState<boolean>(timeStampIkkeUtgatt(unixTimeStamp - getCurrentTimeStamp()));
    const [tid, setTid] = useState<string>('- minutter');
    const [overskrift, setOverskrift] = useState<string>('Du blir snart logget ut');
    const setOpenClsName = (): string => (utlogginsvarsel.varselState === VarselEkspandert.MINIMERT ? '' : 'OPEN');
    const toggleModal = (): void => setModalOpen((prevState) => !prevState);
    const modalMountPoint = (): HTMLElement => document.getElementById('utloggingsvarsel') ?? document.body;

    useEffect(() => {
        const setModalElement = () => (document.getElementById('sitefooter') ? '#sitefooter' : 'body');
        ModalWrapper.setAppElement(setModalElement());
        if (utloggingsvarselOnsket && utlogginsvarsel.timeStamp) {
            try {
                checkTimeStampAndSetTimeStamp(utlogginsvarsel.timeStamp, setModalOpen, setUnixTimestamp, dispatch, utlogginsvarsel, setCookie);
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
                if (!utlogginsvarsel.vistSistePaminnelse) {
                    const utloggingsState: Partial<UtloggingsvarselState> =
                        {
                            ...utlogginsvarsel,
                            varselState: VarselEkspandert.EKSPANDERT,
                            vistSistePaminnelse: true,
                            modalLukketAvBruker: false
                        };
                    dispatch(utloggingsvarselOppdatereStatus(utloggingsState));
                    setCookie(CookieName.DECORATOR_LOGOUT_WARNING, utloggingsState, cookieOptions);
                    if (!modalOpen) {
                        setModalOpen(true);
                    }
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
                    windowType={windowType}
                    overskrift={overskrift}
                    tid={tid}
                />
            </ModalWrapper>
        </div>
    );
};

export default Utloggingsvarsel;
