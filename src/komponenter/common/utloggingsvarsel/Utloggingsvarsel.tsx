import React, { FunctionComponent, useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import { Modal } from '@navikt/ds-react';
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
    VarselEkspandert,
} from '../../../store/reducers/utloggingsvarsel-duck';
import { useCookies } from 'react-cookie';
import { CookieName, cookieOptions } from '../../../server/cookieSettings';
import classNames from 'classnames';

const stateSelector = (state: AppState) => ({
    utloggingsvarsel: state.utloggingsvarsel,
    utloggingsvarselOnsket: state.environment.PARAMS.UTLOGGINGSVARSEL,
    environment: state.environment,
});

const Utloggingsvarsel: FunctionComponent = () => {
    const { utloggingsvarselOnsket, environment, utloggingsvarsel } = useSelector(stateSelector);
    const [, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const cls = BEMHelper('utloggingsvarsel');
    const windowOnMount = () =>
        verifyWindowObj() && window.innerWidth > BREAKPOINT ? WindowType.DESKTOP : WindowType.MOBILE;

    const [modalOpen, setModalOpen] = useState<boolean>(true);
    const [clsOpenClass, setClsOpenClass] = useState<string>('');
    const [unixTimeStamp, setUnixTimestamp] = useState<number>(0);
    const [windowType, setWindowType] = useState<WindowType>(windowOnMount());
    const [interval, setInterval] = useState<boolean>(timeStampIkkeUtgatt(unixTimeStamp - getCurrentTimeStamp()));
    const [tid, setTid] = useState<string>('- minutter');
    const [overskrift, setOverskrift] = useState<string>('Du blir snart logget ut');

    const toggleModal = (): void => setModalOpen((prevState) => !prevState);
    const modalMountPoint = (): HTMLElement => document.getElementById('utloggingsvarsel') ?? document.body;

    useEffect(() => {
        const setModalElement = () => (document.getElementById('sitefooter') ? '#sitefooter' : 'body');
        Modal.setAppElement?.(setModalElement());
        if (utloggingsvarselOnsket && utloggingsvarsel.timeStamp) {
            try {
                checkTimeStampAndSetTimeStamp(
                    utloggingsvarsel.timeStamp,
                    setModalOpen,
                    setUnixTimestamp,
                    dispatch,
                    utloggingsvarsel,
                    setCookie
                );
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    useEffect(() => {
        setClsOpenClass(utloggingsvarsel.varselState === VarselEkspandert.MINIMERT ? '' : 'OPEN');
    }, [utloggingsvarsel.varselState]);

    useEffect(() => {
        setInterval(timeStampIkkeUtgatt(unixTimeStamp - getCurrentTimeStamp()));
    }, [unixTimeStamp]);

    useInterval(
        () => {
            const tokenExpire = unixTimeStamp - getCurrentTimeStamp();
            if (timeStampIkkeUtgatt(getCurrentTimeStamp() - unixTimeStamp + 1)) {
                setInterval(false);
                removeCookie(CookieName.SELVBETJENING_IDTOKEN, cookieOptions);
                window.location.href = getLogOutUrl(environment);
            }

            if (tokenExpire <= 60) {
                if (!utloggingsvarsel.vistSistePaminnelse) {
                    const utloggingsState: Partial<UtloggingsvarselState> = {
                        ...utloggingsvarsel,
                        varselState: VarselEkspandert.EKSPANDERT,
                        vistSistePaminnelse: true,
                        modalLukketAvBruker: false,
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
        <div id="utloggingsvarsel" className={classNames(cls.className, clsOpenClass)}>
            <Modal
                parentSelector={modalMountPoint}
                onClose={toggleModal}
                aria-label="varsel for utløpende sesjon av innlogget bruker"
                open={modalOpen}
                className={cls.element('modal')}
                closeButton={false}
            >
                <Modal.Content>
                    <UtloggingsvarselInnhold
                        setModalOpen={setModalOpen}
                        windowType={windowType}
                        overskrift={overskrift}
                        tid={tid}
                    />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default Utloggingsvarsel;
