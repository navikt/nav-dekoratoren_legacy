import styled, { css } from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';
import { ValgProps } from 'komponenter/chatbot/components/Flervalg/index';

export const ValgContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const Valg = styled.li`
    & + & {
        margin-top: 10px;
    }

    button {
        padding: 15px;
        font-family: ${tema.tekstFamilie};
        font-size: ${tema.storrelser.tekst.generell};
        background: none;
        border: 1px solid #000;
        margin: 0;
        border-radius: 5px;
        cursor: pointer;
        padding-left: 50px;
        position: relative;
        width: 100%;
        text-align: left;

        .radio-button {
            content: '';
            position: absolute;
            height: 20px;
            width: 20px;
            border: 1px solid #000;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            img {
                transform: translateY(-2px);
            }
        }

        &:hover {
            border-color: ${tema.farger.interaksjon};
            color: ${tema.farger.interaksjon};
            box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.23);

            &:before {
                border-color: ${tema.farger.valgtInteraksjon};
                background: ${tema.farger.valgtInteraksjon};
            }
        }

        ${(props: ValgProps) =>
            props.aktiv &&
            css`
                border-color: #707070;
                color: #707070;
                cursor: auto;

                &:before {
                    border-color: #707070;
                }

                &:hover {
                    border-color: #707070;
                    color: #707070;
                    cursor: auto;
                    box-shadow: none;

                    :before {
                        border-color: #707070;
                        background: #fff;
                    }
                }
            `}

        ${(props: ValgProps) =>
            props.valgt &&
            css`
                border-color: ${tema.farger.valgtInteraksjon};
                background: ${tema.farger.valgtInteraksjon};
                color: #000;

                &:before {
                    border-color: ${tema.farger.interaksjon};
                    background: transparent;
                }

                &:hover {
                    box-shadow: none;
                    color: #000;
                    cursor: auto;
                    border-color: ${tema.farger.valgtInteraksjon};

                    &:before {
                        border-color: ${tema.farger.interaksjon};
                        background: transparent;
                    }
                }
            `}
    }
`;

export const Container = styled.div`
    margin-left: ${(props: ValgProps) => (props.kollaps ? '60px' : null)};
`;
