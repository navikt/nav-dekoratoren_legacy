import styled, { css } from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';
import fridaIkon from 'komponenter/chatbot/assets/frida.svg';
import defaultIkon from 'komponenter/chatbot/assets/default.svg';
import { liten } from 'komponenter/chatbot/tema/mediaqueries';

interface Props {
    erApen: boolean;
    queueKey: string;
}

export const Container = styled.div`
    width: ${(props: Props) => (props.erApen ? tema.bredde : '68px')};
    height: ${(props: Props) => (props.erApen ? tema.hoyde : '68px')};
    border-radius: ${(props: Props) => (props.erApen ? '0' : '50%')};
    position: fixed;
    bottom: 50px;
    right: 50px;
    background: ${(props: Props) =>
        props.erApen
            ? '#fff'
            : props.queueKey === 'Q_CHAT_BOT'
            ? `transparent url('data:image/svg+xml;base64,${window.btoa(
                  fridaIkon
              )}') no-repeat center center`
            : `transparent url('data:image/svg+xml;base64,${window.btoa(
                  defaultIkon
              )}') no-repeat center center`};
    background-size: 100%;
    transition: all 300ms cubic-bezier(0.86, 0, 0.07, 1);
    display: flex;
    flex-direction: column;
    border: 1px solid
        ${(props: Props) => (props.erApen ? '#B5B5B5' : 'transparent')};
    box-shadow: 6px 6px 6px 0
        rgba(0, 0, 0, ${(props: Props) => (props.erApen ? '.16' : '0')});
    z-index: 9999;

    ${(props: Props) =>
        !props.erApen &&
        css`
            transform: translatey(0);

            &:hover {
                transform: translatey(-10px);
            }
        `}

    ${liten} {
        width: ${(props: Props) => (props.erApen ? 'auto' : '68px')};
        height: ${(props: Props) => (props.erApen ? 'auto' : '68px')};
        border-radius: ${(props: Props) => (props.erApen ? '0' : '50%')};
        top: ${(props: Props) => (props.erApen ? '0' : undefined)};
        right: ${(props: Props) => (props.erApen ? '0' : '20px')};
        bottom: ${(props: Props) => (props.erApen ? '0' : '20px')};
        left: ${(props: Props) => (props.erApen ? '0' : undefined)};
        box-shadow: none;
        border: none;
    }
`;

export const FridaKnapp = styled.button`
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: none;
    border: none;
`;
