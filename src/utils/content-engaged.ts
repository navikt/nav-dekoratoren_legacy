let timeEngaged = 0;
let idle = true;
let idleTimer: any = null;
let startEngage = Date.now();
let eventListenersAdded = false;

/*  Set the user as idle, and calculate the time
 they were non-idle */
const setIdle = function () {
    timeEngaged += Date.now() - startEngage;
    idle = true;
};

/*  Reset the X second idle timer.
 If the user was idle, start the non-idle timer */
const pulse = function (w: any, pulseSec: number) {
    return function () {
        if (idle) {
            idle = false;
            startEngage = Date.now();
        }
        w.clearTimeout(idleTimer);
        idleTimer = w.setTimeout(setIdle, pulseSec * 1000);
    };
};
const getTimeEngaged = function () {
    if (idle) {
        return timeEngaged;
    } else {
        return timeEngaged + (Date.now() - startEngage);
    }
};
const addEventListeners = function (w: any, pulseSec: number) {
    if (!eventListenersAdded) {
        [
            'click',
            'mousedown',
            'keydown',
            'scroll',
            'mousemove',
            'touchstart',
            'touchmove',
            'touchend',
        ].forEach((eventName) => {
            w.addEventListener(eventName, pulse(w, pulseSec));
        });
        eventListenersAdded = true;
    }
};

export function contentEngaged(seconds: number, callback: () => void) {
    const pulseSec = 3;
    addEventListeners(window, pulseSec);
    const intervalID = window.setInterval(() => {
        if (getTimeEngaged() > seconds * 1000) {
            clearInterval(intervalID);
            callback();
        }
    }, 1000);
}
