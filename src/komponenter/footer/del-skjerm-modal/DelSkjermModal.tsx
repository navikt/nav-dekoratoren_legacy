import React, { useEffect, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './DelSkjermModal.less';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const DelSkjermModal = (props: Props) => {
    const [code, setCode] = useState('');
    useEffect(() => {
        // Init Verdic
        (function(server: string, psID: string) {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = server + '/' + psID + '/ps.js';
            document.getElementsByTagName('head')[0].appendChild(s);
        })(
            'https://account.psplugin.com',
            '83BD7664-B38B-4EEE-8D99-200669A32551'
        );
    }, []);

    const onClick = (e: any) => {
        const submitButtons = document.getElementsByClassName(
            'vngage-btn'
        ) as HTMLCollectionOf<HTMLButtonElement>;
        for (let i = 0; i < submitButtons.length; i++) {
            submitButtons[i].click();
        }
    };

    return (
        <Modal
            className="delskjerm__modal"
            isOpen={props.isOpen}
            contentLabel={'Skjermdeling'}
            onRequestClose={props.onClose}
        >
            <div className={'delskjerm__content'}>
                <Undertittel>Del skjermen din med veilederen</Undertittel>
                <div className={'delskjerm__beskrivelse'}>
                    <Normaltekst>
                        Nå gir du veilederen tilgang til å se det du ser på i
                        nettvindu du har nav.no åpent i
                    </Normaltekst>
                </div>
                <ul
                    id="insert-vergic-container"
                    style={{ display: 'none' }}
                    className={'delskjerm__form'}
                />
                <Input
                    name={'code'}
                    label={'Skriv inn koden du får fra veilederen på telefonen'}
                    value={code}
                    onChange={e => {
                        setCode(e.target.value);
                        const input = document.getElementsByName(
                            'code'
                        ) as NodeListOf<HTMLInputElement>;
                        for (let i = 0; i < input.length; i++) {
                            input[i].value = e.target.value;
                        }
                    }}
                    maxLength={5}
                    bredde={'S'}
                />
                <Hovedknapp className="vngage-btn" onClick={onClick}>
                    Start skjermdeling
                </Hovedknapp>
            </div>
        </Modal>
    );
};

export default DelSkjermModal;
