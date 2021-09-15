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

    console.log('currentUnixTimestamp: ', currentUnixTimestamp);
    console.log('differanse: ', differanse);
    console.log('timeStampIkkeUtgatt(differanse) : ', timeStampIkkeUtgatt(differanse));

    if (timeStampIkkeUtgatt(differanse)) {
        if (differanse < ANTALL_MIN_NAR_VARSELSTART) {
            return setUtloggingVarsel(jwtTimestamp, setModalOpen, setUnixTimeStamp);
        }
        return timeout(jwtTimestamp, differanse - ANTALL_MIN_NAR_VARSELSTART, setModalOpen, setUnixTimeStamp);
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
