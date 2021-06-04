import { Dispatch, SetStateAction } from 'react';

const ANTALL_MIN_NAR_VARSELSTART = 300;

export const timeStampIkkeUtgatt = (differanse: number): boolean => differanse > 0;
export const getCurrentTimeStamp = () => new Date().getTime() / 1000;

export const checkTimeStampAndSetTimeStamp = (
    jwtTimestamp: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>
) => {
    const currentUnixTimestamp = getCurrentTimeStamp();
    const differanse = jwtTimestamp - currentUnixTimestamp;

    if (timeStampIkkeUtgatt(differanse)) {
        if (differanse < ANTALL_MIN_NAR_VARSELSTART) {
            return setUtloggingVarsel(jwtTimestamp, setModalOpen, setUnixTimeStamp);
        }
        return timeout(differanse - ANTALL_MIN_NAR_VARSELSTART, setModalOpen, setUnixTimeStamp);
    }
};

const timeout = (
    timeout: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>
) => {
    setTimeout(() => {
        setUtloggingVarsel(ANTALL_MIN_NAR_VARSELSTART, setModalOpen, setUnixTimeStamp);
    }, timeout);
};

const setUtloggingVarsel = (
    unixTimeStamp: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>
) => {
    setModalOpen(true);
    setUnixTimeStamp(unixTimeStamp);
};
