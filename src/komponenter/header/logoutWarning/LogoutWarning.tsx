import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useLoginStatus } from 'utils/hooks/useLoginStatus';
import { finnTekst } from 'tekster/finn-tekst';

import styles from './LogoutWarning.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

export const LogoutWarning = () => {
    const { refreshTokenHandler, logoutHandler, isTokenExpiring, isSessionExpiring } = useLoginStatus();
    const [isVisible, setIsVisible] = React.useState(false);
    const { language } = useSelector((state: AppState) => state.language);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const onCloseHandler = () => {
        console.log('close');
    };

    if (!isTokenExpiring && !isSessionExpiring) {
        return null;
    }

    if (typeof document === 'undefined') {
        return null;
    }

    const parent = document.getElementById('top-element');

    return (
        <Modal
            open={true}
            onClose={onCloseHandler}
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className={classNames(styles.logoutWarning, isVisible && styles.visible)}
            parentSelector={parent ? () => parent : undefined}
        >
            <Modal.Content>
                <Heading spacing level="1" size="small">
                    {finnTekst('snart-logget-ut-tittel', language)}
                </Heading>
                <BodyLong spacing>{finnTekst('snart-logget-ut-body', language)}</BodyLong>
                <Button className={styles.confirm} onClick={refreshTokenHandler}>
                    {finnTekst('svarknapp-ja', language)}
                </Button>
                <Button className={styles.logout} onClick={logoutHandler} variant="tertiary">
                    {finnTekst('logg-ut-knapp', language)}
                </Button>
            </Modal.Content>
        </Modal>
    );
};
