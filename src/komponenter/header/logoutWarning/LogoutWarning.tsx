import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useLoginStatus } from 'utils/hooks/useLoginStatus';
import { finnTekst } from 'tekster/finn-tekst';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { LangKey } from 'tekster/ledetekster';

import styles from './LogoutWarning.module.scss';

export const LogoutWarning = () => {
    const { refreshTokenHandler, logoutHandler, isTokenExpiring, isSessionExpiring, secondsToSessionExpires } =
        useLoginStatus();
    const [isOpen, setIsOpen] = React.useState(false);
    const { language } = useSelector((state: AppState) => state.language);

    useEffect(() => {
        if (isTokenExpiring || isSessionExpiring) {
            setIsOpen(true);
        }
    }, [isTokenExpiring, isSessionExpiring]);

    const onCloseHandler = () => {
        setIsOpen(false);
    };

    if (typeof document === 'undefined') {
        return null;
    }

    if (!isTokenExpiring && !isSessionExpiring) {
        return null;
    }

    const parent = document.getElementById('top-element');

    const titleId: LangKey = isSessionExpiring ? 'snart-session-logget-ut-tittel' : 'snart-token-logget-ut-tittel';
    const textBodyId: LangKey = isSessionExpiring ? 'snart-session-logget-ut-body' : 'snart-token-logget-ut-body';

    const minutesToSessionEnd = Math.ceil(secondsToSessionExpires / 60);

    return (
        <Modal
            open={isOpen}
            onClose={onCloseHandler}
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className={classNames(styles.logoutWarning, isOpen && styles.visible)}
            parentSelector={parent ? () => parent : undefined}
        >
            <Modal.Content className={styles.content}>
                <Heading spacing level="1" size="small">
                    {finnTekst(titleId, language, minutesToSessionEnd.toString())}
                </Heading>
                <BodyLong spacing>{finnTekst(textBodyId, language)}</BodyLong>
                <div className={styles.buttonWrapper}>
                    {isSessionExpiring && (
                        <Button className={styles.confirm} onClick={onCloseHandler}>
                            {finnTekst('ok', language)}
                        </Button>
                    )}
                    {!isSessionExpiring && isTokenExpiring && (
                        <Button className={styles.confirm} onClick={refreshTokenHandler}>
                            {finnTekst('svarknapp-ja', language)}
                        </Button>
                    )}
                    <Button className={styles.logout} onClick={logoutHandler} variant="tertiary">
                        {finnTekst('logg-ut-knapp', language)}
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};
