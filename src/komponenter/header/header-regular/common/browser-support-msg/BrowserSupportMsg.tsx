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
import './BrowserSupportMsg.less';

import ikon from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import { Undertekst } from 'nav-frontend-typografi';

const storageKey = 'browser-warning-closed';

const isBrowserSupported = () => {
    const browser = detect();
    console.log(browser);
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
        case 'firefox':
            return versionCheck(68);
        case 'edge':
            return versionCheck(18);
        case 'ie':
            return false;
        case 'safari':
            return true;
        case 'opera':
            return true;
        case 'samsung':
            return true;
        default:
            return true;
    }
};

const getBrowserSpecificString = () => {
    const browser = detect();

    if (!browser?.name) {
        return '';
    }

    switch (browser.name) {
        case 'chrome':
            return `Google Chrome v.${browser.version} (kun for test, denne er ok!)`;
        case 'firefox':
            return `Mozilla Firefox v.${browser.version}`;
        case 'edge':
            return `Microsoft Edge v.${browser.version}`;
        case 'ie':
            return `Microsoft Internet Explorer v.${browser.version}`;
        default:
            return '';
    }
};

type Props = {
    baseUrl: string;
};

export const BrowserSupportMsg = ({ baseUrl }: Props) => {
    const [meldingLukket, setMeldingLukket] = useState(true);

    useEffect(() => {
        setMeldingLukket(getStorageItem(storageKey) === 'true');
    }, []);

    if (isBrowserSupported() || meldingLukket) {
        return null;
    }

    const cls = BEMHelper('browser-utdatert');

    const lukk = () => {
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
                    <Undertekst>{getBrowserSpecificString()}</Undertekst>
                </div>
                <button
                    className={cls.element('lukk-knapp')}
                    onClick={lukk}
                    aria-label={'Lukk advarsel for nettleser'}
                >
                    <div className={cls.element('lukk-ikon-1')} />
                    <div className={cls.element('lukk-ikon-2')} />
                </button>
            </div>
        </div>
    );
};
