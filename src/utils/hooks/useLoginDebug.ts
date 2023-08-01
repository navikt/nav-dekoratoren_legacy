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
            'Note: Functions below will only fake token and session expiry in the browser for testing purposes. The actual expiry set by the backend and is not affected:'
        );
        console.info('- expireToken(inSeconds: number) - Sets the token to expire in X seconds.');
        console.info('- expireSession(inSeconds: number) - Sets the session to expire in X seconds.');
        console.info('example: loginDebug().expireToken(60) - Will set the token to expire in 60 seconds.');
        console.groupEnd();

        return {
            expireToken,
            expireSession,
        };
    };

    const expireToken = (inSeconds: number) => {
        if (!inSeconds) {
            console.error('Please provide number of seconds for when to expire the token.');
            return null;
        }

        const fakeTokenEndsAt = new Date(Date.now() + inSeconds * 1000).toISOString();
        dispatch(debugInnloggingOK({ fakeTokenEndsAt }));

        return `Token now set to mock end at ${fakeTokenEndsAt}. Tab switch will reset back to actual token expiry.`;
    };

    const expireSession = (inSeconds: number) => {
        if (!inSeconds) {
            console.log('Please provide number of seconds for when to expire the session.');
            return null;
        }

        const fakeSessionEndsAt = new Date(Date.now() + inSeconds * 1000).toISOString();
        dispatch(debugInnloggingOK({ fakeSessionEndsAt }));
        return `Session now set to mock end at ${fakeSessionEndsAt}. Tab switch will reset back to actual session expiry.`;
    };
    return true;
};
