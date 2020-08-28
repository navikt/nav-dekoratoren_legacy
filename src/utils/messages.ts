export const postMessageToApp = (event: string, payload: any) => {
    const message = {
        source: 'decorator',
        event: 'auth',
        payload,
    };
    window.postMessage(message, window.location.origin);
};
