import { useEffect, useState } from 'react';

export const useLocation = () => {
    const [location, setLocation] = useState<Location>();

    useEffect(() => {
        setLocation(window.location);

        const pushState = window.history.pushState;
        window.history.pushState = (...args: Parameters<typeof pushState>) => {
            pushState.call(window.history, ...args);
            setLocation(window.location);
        };

        return () => {
            window.history.pushState = pushState;
        };
    }, []);

    return { location };
};
