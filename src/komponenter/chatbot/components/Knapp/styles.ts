import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';

export const KnappElement = styled.button`
    background: ${(props: { aktiv?: boolean; prosent?: number }) =>
        props.aktiv ? tema.farger.interaksjon : '#fff'};
    border: 1px solid ${tema.farger.interaksjon};
    color: ${(props: { aktiv?: boolean; prosent?: number }) =>
        props.aktiv ? '#fff' : tema.farger.interaksjon};
    cursor: pointer;
    padding: 10px;
    font-family: ${tema.tekstFamilie};
    font-size: ${tema.storrelser.tekst.generell};
    position: relative;

    &:disabled {
        border-color: ${tema.farger.tekst.klokketekst};
        color: ${tema.farger.tekst.klokketekst};
        cursor: default;
    }
`;
