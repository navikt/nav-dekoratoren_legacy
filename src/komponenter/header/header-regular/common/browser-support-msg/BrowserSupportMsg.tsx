import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'utils/bem';
import { setStorageItem } from 'utils/sessionStorage';
import { getStorageItem } from 'utils/sessionStorage';
import { detect } from 'detect-browser';
import { Undertekst } from 'nav-frontend-typografi';
import './BrowserSupportMsg.less';

import ikon from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import { BrowserInfo } from 'detect-browser';

const storageKey = 'browser-warning-closed';

const isBrowserSupported = (browser: BrowserInfo) => {
    if (!browser?.name) {
        return true;
    }

    const versionCheck = (majorReq: number, minorReq: number = 0) => {
        if (!browser.version) {
            return true;
        }
        const [majorCurrent, minorCurrent] = browser.version
            .split('.')
            .map(Number);
        if (!majorCurrent) {
            return true;
        }
        return (
            majorCurrent >= majorReq &&
            (minorCurrent ? minorCurrent >= minorReq : true)
        );
    };

    switch (browser.name) {
        case 'chrome':
            return false;
        case 'ie':
            return false;
        default:
            return true;
    }
};

const getBrowserSpecificMsg = (browser: BrowserInfo) => {
    if (!browser?.name) {
        return null;
    }

    switch (browser.name) {
        case 'chrome':
            return `Google Chrome v.${browser.version} (kun for test, denne er ok!)`;
        case 'ie':
            return `Microsoft Internet Explorer v.${browser.version}`;
        default:
            return null;
    }
};

type Props = {
    baseUrl: string;
};

export const BrowserSupportMsg = ({ baseUrl }: Props) => {
    const [meldingLukket, setMeldingLukket] = useState(true);

    const browser = detect() as BrowserInfo;

    useEffect(() => {
        setMeldingLukket(getStorageItem(storageKey) === 'true');
    }, []);

    if (isBrowserSupported(browser) || meldingLukket) {
        return null;
    }

    const cls = BEMHelper('browser-utdatert');
    const browserSpecificMsg = getBrowserSpecificMsg(browser);

    const closeWarning = () => {
        setMeldingLukket(true);
        setStorageItem(storageKey, 'true');
    };

    return (
        <div className={cls.element('wrapper')}>
            <div className={cls.element('innhold')}>
                <div className={cls.element('varsel-ikon')}>
                    <img alt={''} src={`${baseUrl}${ikon}`} />
                </div>
                <div className={cls.element('tekst')}>
                    <Undertittel>
                        <Tekst id={'browser-utdatert-msg'} />{' '}
                        <Lenke href={'#'}>
                            <Tekst id={'browser-utdatert-lenke'} />
                        </Lenke>
                    </Undertittel>
                    {browserSpecificMsg && (
                        <Undertekst>
                            <Tekst id={'browser-utdatert-din-nettleser'} />
                            {browserSpecificMsg}
                        </Undertekst>
                    )}
                </div>
                <button
                    className={cls.element('lukk-knapp')}
                    onClick={closeWarning}
                    aria-label={'Lukk advarsel for nettleser'}
                >
                    <div className={cls.element('lukk-ikon-1')} />
                    <div className={cls.element('lukk-ikon-2')} />
                </button>
            </div>
        </div>
    );
};
