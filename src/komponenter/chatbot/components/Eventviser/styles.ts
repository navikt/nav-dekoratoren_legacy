import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';

export const Event = styled.div`
    font-family: ${tema.tekstFamilie};
    font-size: ${tema.storrelser.tekst.metaInfo};
    color: ${tema.farger.tekstfelt};
    margin: 10px 0;
    font-style: italic;
`;
