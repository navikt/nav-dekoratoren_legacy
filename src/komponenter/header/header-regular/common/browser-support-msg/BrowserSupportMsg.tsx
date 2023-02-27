import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Detail, Heading, Link } from '@navikt/ds-react';
import { Close } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import { detect } from 'detect-browser';
import { BrowserInfo } from 'detect-browser';
import { useCookies } from 'react-cookie';
import { erDev } from 'utils/Environment';
import ikon from 'ikoner/advarsel-sirkel-fyll.svg';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import style from './BrowserSupportMsg.module.scss';

const cookieKey = 'decorator-browser-warning-closed';
const linkUrl =
    'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/hjelp-til-personbruker/elektronisk-innsending_kap';

const isBrowserSupported = (browser: BrowserInfo) => {
    if (!browser?.name) {
        return true;
    }

    switch (browser.name) {
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
        case 'ie':
            return `Microsoft Internet Explorer v.${browser.version}`;
        default:
            return null;
    }
};

export const BrowserSupportMsg = () => {
    const [meldingLukket, setMeldingLukket] = useState(true);
    const [cookies, setCookie] = useCookies([cookieKey]);

    const browser = detect() as BrowserInfo;

    useEffect(() => {
        setMeldingLukket(cookies[cookieKey] === 'true');
    }, [cookies]);

    if (isBrowserSupported(browser) || meldingLukket) {
        return null;
    }

    const browserSpecificMsg = getBrowserSpecificMsg(browser);

    const closeWarning = () => {
        setMeldingLukket(true);
        setCookie(cookieKey, true, { domain: erDev ? undefined : 'nav.no' });
    };

    return (
        <div className={style.wrapper}>
            <div className={style.innhold}>
                <div className={style.varselIkon}>
                    <Bilde altText={''} asset={ikon} />
                </div>
                <div className={style.tekst}>
                    <Heading level="2" size="small">
                        <Tekst id={'browser-utdatert-msg'} />{' '}
                        <Link href={linkUrl}>
                            <Tekst id={'browser-utdatert-lenke'} />
                        </Link>
                    </Heading>
                    {browserSpecificMsg && (
                        <Detail>
                            <Tekst id={'browser-utdatert-din-nettleser'} />
                            {browserSpecificMsg}
                        </Detail>
                    )}
                </div>
                <Button
                    size="small"
                    variant="tertiary"
                    icon={<Close title="Lukk advarsel for nettleser" aria-hidden />}
                    onClick={closeWarning}
                />
            </div>
        </div>
    );
};
