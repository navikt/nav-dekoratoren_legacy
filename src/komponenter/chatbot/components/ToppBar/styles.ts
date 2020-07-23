import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';

export const Bar = styled.div`
    border-bottom: 2px solid #000;
    font-family: Arial, sans-serif;
    font-size: ${tema.storrelser.tekst.toppBar};
    margin: 0;
    display: flex;
    background: ${(props: { navn: string }) =>
        props.navn === 'Chatbot Frida'
            ? tema.farger.toppBar.bot
            : tema.farger.toppBar.ekstern};
    color: ${(props: { navn: string }) =>
        props.navn === 'Chatbot Frida' ? undefined : '#fff'};
    transition: all 300ms ease-in-out;
    z-index: 10;
`;

export const Navn = styled.div`
    flex: 0 1 auto;
    padding: 15px;
`;

export const Knapper = styled.div`
    flex: 0 1 auto;
    display: flex;
    margin-left: auto;
`;

export const Knapp = styled.button`
    flex: 0 1 auto;
    padding: 15px;
    cursor: pointer;
    background: none;
    border: none;

    svg {
        width: 20px;
        height: 20px;

        line,
        path {
            stroke: ${(props: { navn: string }) =>
                props.navn === 'Chatbot Frida' ? undefined : '#fff'};
            transition: all 300ms ease-in-out;
        }
    }
`;
