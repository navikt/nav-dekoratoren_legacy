import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';

export const Snakkeboble = styled.div`
    font-family: ${tema.tekstFamilie};
    font-size: ${tema.storrelser.tekst.generell};
    padding: 15px;
    background: ${tema.farger.snakkebobler.bot};
    border-radius: 0 7px 7px 7px;
    word-break: break-word;
    margin-top: 10px;

    a,
    a:visited,
    :link {
        color: ${tema.farger.interaksjon};
    }
`;

export const Container = styled.div`
    border: 1px solid ${tema.farger.tekstfelt};
    background: #fff;
    display: flex;
    justify-content: space-between;
    border-radius: 0 0 7px 7px;
`;

export const Eval = styled.button`
    padding: 10px;
    background: none;
    border: none;

    svg {
        width: 30px;
        height: 30px;
        cursor: ${(props: { evalValgt: boolean; valgt: boolean }) =>
            !props.evalValgt ? 'pointer' : 'default'};
        transition: all 150ms ease-in-out;

        circle,
        path {
            stroke: ${(props: { evalValgt: boolean; valgt: boolean }) =>
                props.valgt ? '#0067c5' : props.evalValgt ? '#ccc' : undefined};
        }

        &:hover {
            transform: ${(props: { evalValgt: boolean; valgt: boolean }) =>
                !props.evalValgt ? 'translateY(-5px)' : undefined};
        }
    }
`;

export const Outer = styled.div``;
