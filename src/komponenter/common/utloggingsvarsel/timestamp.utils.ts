import { Dispatch, SetStateAction } from 'react';
import { CookieSetOptions } from 'universal-cookie/cjs/types';
import { SettUtloggingsvarselOpppdatereStatus } from '../../../store/actions';
import {
    utloggingsvarselOppdatereStatus,
    UtloggingsvarselState,
    VarselEkspandert,
} from '../../../store/reducers/utloggingsvarsel-duck';
import { CookieName, cookieOptions, getCookieContextKey } from '../../../server/cookieSettings';

const ANTALL_MIN_NAR_VARSELSTART = 300;

export const timeStampIkkeUtgatt = (differanse: number): boolean => differanse > 0;
export const getCurrentTimeStamp = () => new Date().getTime() / 1000;

export const checkTimeStampAndSetTimeStamp = (
    jwtTimestamp: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>,
    dispatch: Dispatch<SettUtloggingsvarselOpppdatereStatus>,
    utlogginsvarsel: UtloggingsvarselState,
    cookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void
) => {
    const currentUnixTimestamp = getCurrentTimeStamp();
    const differanse = jwtTimestamp - currentUnixTimestamp;

    if (timeStampIkkeUtgatt(differanse) && utlogginsvarsel.miljo === getCookieContextKey(window.location.origin)) {
        if (differanse < ANTALL_MIN_NAR_VARSELSTART) {
            return setUtloggingVarsel(
                jwtTimestamp,
                setModalOpen,
                setUnixTimeStamp,
                !utlogginsvarsel.modalLukketAvBruker
            );
        }
        return timeout(
            jwtTimestamp,
            differanse - ANTALL_MIN_NAR_VARSELSTART,
            setModalOpen,
            setUnixTimeStamp,
            dispatch,
            utlogginsvarsel,
            cookie
        );
    }
};

const timeout = (
    timestamp: number,
    timeoutDiff: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>,
    dispatch: Dispatch<SettUtloggingsvarselOpppdatereStatus>,
    utloggingsvarsel: UtloggingsvarselState,
    setCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void
) => {
    const SECONDS_BETWEEN_SET_TIMEOUT = 9;
    const remainingTimeoutDiff = timeoutDiff - SECONDS_BETWEEN_SET_TIMEOUT;
    setTimeout(() => {
        if (remainingTimeoutDiff < 0) {
            const utloggingsState: UtloggingsvarselState = {
                ...utloggingsvarsel,
                varselState: VarselEkspandert.EKSPANDERT,
                vistSistePaminnelse: false,
                modalLukketAvBruker: false,
            };
            dispatch(utloggingsvarselOppdatereStatus(utloggingsState));
            setCookie(CookieName.DECORATOR_LOGOUT_WARNING, utloggingsState, cookieOptions);
            setUtloggingVarsel(timestamp, setModalOpen, setUnixTimeStamp);
        } else {
            timeout(
                timestamp,
                remainingTimeoutDiff,
                setModalOpen,
                setUnixTimeStamp,
                dispatch,
                utloggingsvarsel,
                setCookie
            );
        }
    }, SECONDS_BETWEEN_SET_TIMEOUT * 1000);
};

const setUtloggingVarsel = (
    unixTimeStamp: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>,
    harIkkeAlleredeLukketModal: boolean = true
) => {
    setModalOpen(harIkkeAlleredeLukketModal);
    setUnixTimeStamp(unixTimeStamp);
};
