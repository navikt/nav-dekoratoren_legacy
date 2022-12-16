import React, { useEffect, useState } from 'react';
import { logAmplitudeEvent } from '../../../../utils/analytics/amplitude';

import style from './GodJul.module.scss';

const numLights = 30;
const numSnowflakes = 10;

export const GodJul = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        let keysPressed: string[] = [];

        const handler = (event: KeyboardEvent) => {
            if (!event?.key || event.key === ' ') {
                return;
            }
            keysPressed.push(event.key.toLowerCase());
            keysPressed = keysPressed.slice(-6);
            if (keysPressed.join('') === 'godjul') {
                setIsEnabled(true);
                document.removeEventListener('keydown', handler);
                logAmplitudeEvent('godjul');
            }
        };

        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);

    if (!isEnabled) {
        return null;
    }

    return (
        <div className={style.godjul} aria-hidden={true}>
            <ul className={style.lightrope}>
                {Array.from({ length: numLights }, () => (
                    <li />
                ))}
            </ul>
            <ul className={style.snowflakes}>
                {Array.from({ length: numSnowflakes }, () => (
                    <li />
                ))}
            </ul>
        </div>
    );
};
