import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';
import { AlertstripeProps } from 'komponenter/chatbot/components/Alertstripe/index';

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

export const Ikon = styled.div`
    flex: 0 0 25px;
    height: 25px;
    width: 25px;
    background: red;
    margin-right: 20px;
    background: transparent;
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
