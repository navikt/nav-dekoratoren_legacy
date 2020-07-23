import styled from 'styled-components';
import fridaIkon from 'komponenter/chatbot/assets/frida.svg';
import tema from 'komponenter/chatbot/tema/tema';
import { KommunikasjonState } from 'komponenter/chatbot/components/Kommunikasjon/index';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
`;

export const Indre = styled.div`
    display: flex;
`;

export const Venstre = styled.div`
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
    margin-right: 10px;
`;

export const Hoyre = styled.div`
    margin-left: ${(props: KommunikasjonState) =>
        props.side === 'VENSTRE' ? undefined : 'auto'};
`;

export const Brukerbilde = styled.div`
    width: 50px;
    height: 50px;
    ${(props: { brukerBilde: string | undefined }) =>
        props.brukerBilde
            ? `background: transparent url('${props.brukerBilde.trim()}') no-repeat center center`
            : `background: transparent url('data:image/svg+xml;base64, ${window.btoa(
                  fridaIkon
              )}') no-repeat center center`};
`;

export const Snakkeboble = styled.div`
    font-family: ${tema.tekstFamilie};
    font-size: ${tema.storrelser.tekst.generell};
    padding: 15px;
    background: ${(props: KommunikasjonState) =>
        props.brukerType === 'Bot'
            ? tema.farger.snakkebobler.bot
            : props.brukerType === 'Human'
            ? tema.farger.snakkebobler.agent
            : tema.farger.snakkebobler.bruker};
    border-radius: ${(props: KommunikasjonState) =>
        props.side === 'VENSTRE' ? '0 7px 7px 7px' : '7px 0 7px 7px'};
    word-break: break-word;

    svg {
        height: 30px;
        width: 30px;
    }

    a,
    a:visited,
    :link {
        color: ${tema.farger.interaksjon};
        text-decoration: underline;
    }
`;
