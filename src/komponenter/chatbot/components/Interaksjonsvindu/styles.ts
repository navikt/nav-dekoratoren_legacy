import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';

export const Interaksjon = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow-x: hidden;

    &:before {
        content: '';
        position: absolute;
        height: 10px;
        width: 100%;
        top: 0;
        display: block;
        box-shadow: inset 0 10px 5px -6px rgba(0, 0, 0, 0.16);
        transition: top 150ms ease-in-out;
    }
`;
export const Chatlog = styled.div`
    height: 100%;
    overflow-y: scroll;
    padding: 15px;
`;
export const Tekstomrade = styled.form`
    margin-top: auto;
    display: flex;
    border-top: 1px solid ${tema.farger.tekstfelt};
    height: 20%;
    padding: 15px;
    align-items: center;
    min-height: 85px;
    z-index: 10;
`;
export const Tekstfelt = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    margin-right: 5px;
    border: none;
    font-size: ${tema.storrelser.tekst.generell};
    font-family: ${tema.tekstFamilie};
    outline: none;

    ::placeholder {
        color: ${tema.farger.tekstfelt};
    }

    :disabled {
        opacity: 0.5;
        background: #fff;
    }
`;

export const SendKnappOgTeller = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
`;

export const Teller = styled.div`
    font-size: ${tema.storrelser.tekst.teller};
    font-family: ${tema.tekstFamilie};
    margin-top: 5px;
    color: ${(props: { error: boolean }) =>
        props.error ? 'red' : tema.farger.tekst.klokketekst};
`;

export const AlertstripeSeksjon = styled.div`
    & + & {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed ${tema.farger.alertstripe.info.border};
    }
`;

export const AlertstripeHeader = styled.h2`
    margin: 0;
    font-size: ${tema.storrelser.tekst.toppBar};
`;

export const AlertstripeForklarendeTekst = styled.p`
    margin: 0;
    color: ${tema.farger.tekstfelt};

    &:last-of-type {
        margin-bottom: 10px;
    }
`;

export const UthevetTekst = styled.span`
    font-weight: bold;
`;
