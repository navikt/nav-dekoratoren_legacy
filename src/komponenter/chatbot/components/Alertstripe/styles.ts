import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';
import { AlertstripeProps } from 'komponenter/chatbot/components/Alertstripe/index';

import informasjon from 'komponenter/chatbot/assets/informasjon.svg';
import advarsel from 'komponenter/chatbot/assets/advarsel.svg';
import feil from 'komponenter/chatbot/assets/feil.svg';
import suksess from 'komponenter/chatbot/assets/suksess.svg';

export const Container = styled.div`
    padding: 15px;
    display: flex;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    align-items: center;
    background: ${(props: AlertstripeProps) =>
        tema.farger.alertstripe[props.type.toLowerCase()].bakgrunn};
    border-bottom: 1px solid
        ${(props: AlertstripeProps) =>
            tema.farger.alertstripe[props.type.toLowerCase()].border};
    z-index: 9;
    flex: 0 0 auto;
    min-height: 0;
`;

const ikon = (type: 'info' | 'suksess' | 'advarsel' | 'feil') => {
    switch (type) {
        case 'advarsel':
            return advarsel;
        case 'feil':
            return feil;
        case 'info':
            return informasjon;
        case 'suksess':
            return suksess;
        default:
            return informasjon;
    }
};

export const Ikon = styled.div`
    flex: 0 0 25px;
    height: 25px;
    width: 25px;
    background: red;
    margin-right: 20px;
    background: ${(props: AlertstripeProps) =>
        `transparent url('data:image/svg+xml;base64,${window.btoa(
            ikon(props.type)
        )}') no-repeat center center`};
    align-self: flex-start;
`;

export const Tekst = styled.div`
    flex: 1;

    a,
    a:visited,
    :link {
        color: ${tema.farger.interaksjon};
    }
`;
