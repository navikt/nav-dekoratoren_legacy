import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { debugInnloggingOK } from 'store/reducers/innloggingsstatus-duck';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
});

export const useLoginDebug = () => {
    const dispatch = useDispatch();
    const { innloggetStatus } = useSelector(stateSelector);

    const innloggetStatusRef = useRef(innloggetStatus);
    innloggetStatusRef.current = innloggetStatus;

    useEffect(() => {
        window.loginDebug = loginDebug;
    }, []);

    const loginDebug = () => {
        console.group('Debugging Auth - Information');
        console.info('------------------------------');
        console.info('Current auth data:', innloggetStatusRef.current);
        console.info('------------------------------');
        console.info(
            'Note: Functions below will only fake token and session expiry in the browser for testing purposes. The actual expiry set by the backend and is not affected.'
        );
        console.groupEnd();

        return {
            expireToken,
            expireSession,
        };
    };

    const expireToken = (inSeconds: number) => {
        if (!inSeconds) {
            console.error('Please provide number of seconds for when to expire the token.');
        }

        const fakeTokenEndsAt = new Date(Date.now() + inSeconds * 1000).toISOString();
        dispatch(debugInnloggingOK({ fakeTokenEndsAt }));

        return `Auth debug: Setting the fake token to end at ${fakeTokenEndsAt}. Note that tab switch will reset back to the true token expiry.`;
    };

    const expireSession = (inSeconds: number) => {
        if (!inSeconds) {
            console.log('Please provide number of seconds for when to expire the session.');
        }

        const fakeSessionEndsAt = new Date(Date.now() + inSeconds * 1000).toISOString();
        dispatch(debugInnloggingOK({ fakeSessionEndsAt }));
        return `Auth debug: Setting the fake session to end at ${fakeSessionEndsAt}. Note that tab switch will reset back to the true session expiry.`;
    };
    return true;
};
