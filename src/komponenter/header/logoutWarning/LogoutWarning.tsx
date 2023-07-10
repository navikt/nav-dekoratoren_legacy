import { BodyLong, Heading, Modal } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useLoginStatus } from 'utils/hooks/useLoginStatus';

export const LogoutWarning = () => {
    const { loginStatus, isTokenExpiring, isSessionExpiring } = useLoginStatus();

    const onCloseHandler = () => {
        console.log('close');
    };

    const checkForLogoutAndWait = () => {
        // console.log('checking for logout');

        setTimeout(() => {
            checkForLogoutAndWait();
        }, 1000);
    };

    console.log(loginStatus);

    useEffect(() => {
        checkForLogoutAndWait();
    }, []);

    if (!(isTokenExpiring && isSessionExpiring)) {
        return null;
    }

    const parent = document.getElementById('top-element');

    return (
        <Modal
            open={true}
            onClose={onCloseHandler}
            closeButton={false}
            parentSelector={parent ? () => parent : undefined}
        >
            <Modal.Content>
                <Heading spacing level="1" size="large" id="modal-heading">
                    Laborum proident id ullamco
                </Heading>
                <Heading spacing level="2" size="medium">
                    Excepteur labore nostrud incididunt exercitation.
                </Heading>
                <BodyLong spacing>
                    Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui incididunt dolor do ad ut.
                    Incididunt eiusmod nostrud deserunt duis laborum. Proident aute culpa qui nostrud velit adipisicing
                    minim. Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua exercitation non minim
                    minim pariatur sunt laborum ipsum. Exercitation nostrud est laborum magna non non aliqua qui esse.
                </BodyLong>
            </Modal.Content>
        </Modal>
    );
};
