import { Dispatch, SetStateAction } from 'react';

const ANTALL_SEC_NAR_VARSELSTART = process.env.ENV === 'prod' ? 300 : 3540;

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
        if (differanse < ANTALL_SEC_NAR_VARSELSTART) {
            return setUtloggingVarsel(jwtTimestamp, setModalOpen, setUnixTimeStamp);
        }
        return timeout(jwtTimestamp, differanse - ANTALL_SEC_NAR_VARSELSTART, setModalOpen, setUnixTimeStamp);
    }
};

const timeout = (
    timestamp: number,
    timeoutDiff: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>
) => {
    setTimeout(() => {
        setUtloggingVarsel(timestamp, setModalOpen, setUnixTimeStamp);
    }, timeoutDiff * 1000);
};

const setUtloggingVarsel = (
    unixTimeStamp: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setUnixTimeStamp: Dispatch<SetStateAction<number>>
) => {
    setModalOpen(true);
    setUnixTimeStamp(unixTimeStamp);
};
