import React from 'react';
import { useState } from 'react';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { useEffect } from 'react';
import { getStorageItem } from 'utils/sessionStorage';
import { setStorageItem } from 'utils/sessionStorage';
import { desktopHeaderLogoId } from 'komponenter/header/header-regular/desktop/DesktopMenylinje';

const storageKey = 'darkmode-toggle';

const setDarkModeStyle = (enabled: boolean) => {
    const headerLogoDesktop = document.getElementById(desktopHeaderLogoId);
    if (enabled) {
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

export const DarkModeKnapp = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(getStorageItem(storageKey) === 'true');
    }, []);

    useEffect(() => {
        setDarkModeStyle(darkMode);
        setStorageItem(storageKey, darkMode.toString());
    }, [darkMode]);

    return (
        <LenkeMedGA
            href={''}
            onClick={(e) => {
                e.preventDefault();
                setDarkMode(!darkMode);
            }}
        >
            {'Invertér farger'}
        </LenkeMedGA>
    );
};
