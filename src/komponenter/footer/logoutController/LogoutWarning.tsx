import { BodyLong, Heading, Modal } from '@navikt/ds-react';
import React from 'react';

export const LogoutWarning = () => {
    const onCloseHandler = () => {
        console.log('close');
    };

    const parent = document.getElementById('top-element');

    console.log(parent);

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
