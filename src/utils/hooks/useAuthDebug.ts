import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { debugInnloggingOK } from 'store/reducers/innloggingsstatus-duck';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
});

export const useAuthDebug = () => {
    const dispatch = useDispatch();
    const { innloggetStatus } = useSelector(stateSelector);

    const innloggetStatusRef = useRef(innloggetStatus);
    innloggetStatusRef.current = innloggetStatus;

    useEffect(() => {
        window.authDebug = authDebug;
    }, []);

    const authDebug = () => {
        console.group('Debugging Auth - Information');
        console.info('------------------------------');
        console.info('Current auth data:', innloggetStatusRef.current);
        console.groupEnd();

        return {
            debugTokenExpiration,
            debugSessionExpiration,
        };
    };

    const debugTokenExpiration = (inSeconds: number) => {
        if (!inSeconds) {
            console.log('You need to provide a number of seconds to fake token expiration');
        }

        const fakeTokenEndsAt = new Date(Date.now() + inSeconds * 1000).toISOString();
        dispatch(debugInnloggingOK({ fakeTokenEndsAt }));

        return `Auth debug: Setting the fake token to end at ${fakeTokenEndsAt}`;
    };

    const debugSessionExpiration = (inSeconds: number) => {
        if (!inSeconds) {
            console.log('You need to provide a number of seconds to fake token expiration');
        }

        const fakeSessionEndsAt = new Date(Date.now() + inSeconds * 1000).toISOString();
        dispatch(debugInnloggingOK({ fakeSessionEndsAt }));
        return `Auth debug: Setting the fake session to end at ${fakeSessionEndsAt}`;
    };
    return true;
};
