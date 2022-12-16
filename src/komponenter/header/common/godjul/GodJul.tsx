import React, { useEffect, useState } from 'react';
import { logAmplitudeEvent } from '../../../../utils/analytics/amplitude';

import style from './GodJul.module.scss';

export const GodJul = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        let keysPressed: string[] = [];

        const handler = (event: KeyboardEvent) => {
            const { key } = event;
            keysPressed.push(key.toLowerCase());
            keysPressed = keysPressed.slice(-6);
            if (keysPressed.join('') === 'godjul') {
                setIsEnabled(true);
                document.removeEventListener('keydown', handler);
                logAmplitudeEvent('godjul');
            }
        };

        document.addEventListener('keydown', handler);

        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, []);

    if (!isEnabled) {
        return null;
    }

    return (
        <div className={style.godjul} aria-hidden={true}>
            <ul className={style.lightrope}>
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
            </ul>
            <ul className={style.snowflakes}>
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
            </ul>
        </div>
    );
};
