import React from 'react';
import { useState } from 'react';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { useEffect } from 'react';
import { getStorageItem } from 'utils/sessionStorage';
import { setStorageItem } from 'utils/sessionStorage';
import { desktopHeaderLogoId } from 'komponenter/header/header-regular/desktop/DesktopMenylinje';

const storageKey = 'darkmode-toggle';

export const DarkModeKnapp = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(getStorageItem(storageKey) === 'true');
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        setStorageItem(storageKey, darkMode.toString());
        const headerLogoDesktop = document.getElementById(desktopHeaderLogoId);
        if (darkMode) {
            document.body.classList.add('dark-mode');
            if (headerLogoDesktop) {
                headerLogoDesktop.style.filter = 'invert(100%)';
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (headerLogoDesktop) {
                headerLogoDesktop.style.removeProperty('filter');
            }
        }
    };

    return (
        <LenkeMedGA
            href={''}
            onClick={(e) => {
                e.preventDefault();
                toggleDarkMode();
            }}
        >
            {'Invertér farger'}
        </LenkeMedGA>
    );
};
