import styled from 'styled-components';
import { Container } from 'komponenter/chatbot/components/Alertstripe/styles';
import tema from 'komponenter/chatbot/tema/tema';

export const Boks = styled(Container)`
    background: ${tema.farger.alertstripe.advarsel.bakgrunn};
    border-color: ${tema.farger.alertstripe.advarsel.border};
    z-index: 9;
    flex: 0 0 auto;
    min-height: 0;
`;

export const Tekst = styled.div`
    flex: 1 1 auto;
    max-width: 66%;
`;

export const Undertekst = styled.p`
    margin: 0;
    padding: 0;
    color: ${tema.farger.tekst.klokketekst};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Knapp = styled.button`
    border: none;
    background: none;
    padding: 10px;
    cursor: pointer;

    & + & {
        margin-left: 10px;
    }

    svg {
        height: 20px;
        width: 20px;
    }
`;

export const JaKnapp = styled(Knapp)`
    & line,
    & path {
        outline: ${tema.farger.alertstripe.suksess.border};
        fill: ${tema.farger.alertstripe.suksess.border};
        stroke: ${tema.farger.alertstripe.suksess.border};
    }
`;

export const NeiKnapp = styled(Knapp)`
    & line,
    & path {
        outline: ${tema.farger.alertstripe.feil.border};
        fill: ${tema.farger.alertstripe.feil.border};
        stroke: ${tema.farger.alertstripe.feil.border};
    }
`;
