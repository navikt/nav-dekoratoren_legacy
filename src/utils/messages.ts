export const postMessageToApp = (event: string, payload: any) => {
    const message = {
        source: 'decorator',
        event: event,
        payload,
    };
    window.postMessage(message, window.location.origin);
};

export const msgSafetyCheck = (message: MessageEvent) => {
    const { origin, source } = message;
    // Only allow messages from own window
    if (window.location.href.indexOf(origin) === 0 && source === window) {
        return true;
    }
    return false;
};
