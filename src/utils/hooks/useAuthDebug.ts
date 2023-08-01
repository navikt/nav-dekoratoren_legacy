import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    environment: state.environment,
});

export const useAuthDebug = () => {
    console.log('UseAuthDebug');
    const { innloggetStatus, environment } = useSelector(stateSelector);

    const innloggetStatusRef = useRef(innloggetStatus);
    innloggetStatusRef.current = innloggetStatus;

    useEffect(() => {
        console.log('Debugging Auth');
        window.authDebug = authDebug;
    }, []);

    const authDebug = () => {
        console.log('Debugging Auth');
        console.log('-----------------------------------');
        console.log(innloggetStatusRef.current);

        return {
            fakeTokenExpiration,
        };
    };

    const fakeTokenExpiration = (inSeconds: number) => {
        if (!inSeconds) {
            console.log('You need to provide a number of seconds to fake token expiration');
        }
        console.log('Faking token expiration', inSeconds);
    };

    return true;
};
