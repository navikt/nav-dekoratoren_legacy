import { useEffect } from 'react';
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

export const usePushStateCallback = (callbackId: string, callback: PushStateCallback) => {
    useEffect(() => {
        callbacksMap[callbackId] = callback;

        return () => {
            delete callbacksMap[callbackId];
        };
    }, [callbackId, callback]);
};
