import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';
import { MetaInfoProps } from 'komponenter/chatbot/components/MetaInfo/index';

export const Container = styled.div`
    color: ${tema.farger.tekst.klokketekst};
    font-family: ${tema.tekstFamilie};
    font-size: ${tema.storrelser.tekst.metaInfo};
    display: flex;
    margin-bottom: 5px;
    justify-content: ${(props: MetaInfoProps) =>
        props.side === 'VENSTRE' ? 'flex-start' : 'flex-end'};
`;

export const NickName = styled.div`
    color: ${(props: MetaInfoProps) =>
        props.side === 'VENSTRE'
            ? tema.farger.tekst.ekstern
            : tema.farger.tekst.klokketekst};
    order: ${(props: MetaInfoProps) => (props.side === 'VENSTRE' ? -1 : 1)};
    margin: ${(props: MetaInfoProps) =>
        props.side === 'VENSTRE' ? '0 5px 0 0' : '0 0 0 5px'};
`;
