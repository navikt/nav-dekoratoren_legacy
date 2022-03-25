import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { verifyWindowObj } from '../Environment';

type PushStateArgs = Parameters<typeof window.history.pushState>;

type PushStateCallback = (...args: any) => any;

const callbacksMap: { [key: string]: PushStateCallback } = {};

if (verifyWindowObj()) {
    const pushStateActual = window.history.pushState;

    window.history.pushState = (...args: PushStateArgs) => {
        pushStateActual.call(window.history, ...args);
        Object.values(callbacksMap).forEach((callback) => {
            callback(...args);
        });
    };
}

export const usePushStateCallback = (callback: PushStateCallback) => {
    useEffect(() => {
        const id = uuidv4();
        callbacksMap[id] = callback;

        return () => {
            delete callbacksMap[id];
        };
    }, [callback]);
};
