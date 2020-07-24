import styled from 'styled-components';
import tema from 'komponenter/chatbot/tema/tema';
import { liten } from 'komponenter/chatbot/tema/mediaqueries';

interface Props {
    erApen: boolean;
    queueKey: string;
}

const ikonSize = 68;
const ikonSizePx = `${ikonSize}px`;
const tekstHeightPx = `${Math.floor(ikonSize * 0.67)}px`;
const navGra20 = '#c6c2bf';
const navDypBla = '#005B82';

export const Container = styled.div`
    width: ${(props: Props) => (props.erApen ? tema.bredde : '100%')};
    height: ${(props: Props) => (props.erApen ? tema.hoyde : '100%')};
    border-radius: ${(props: Props) => (props.erApen ? '0' : '50%')};
    background: ${(props: Props) => (props.erApen ? '#fff' : 'transparent')};
    display: flex;
    flex-direction: column;
    border: 1px solid
        ${(props: Props) => (props.erApen ? '#B5B5B5' : 'transparent')};
    box-shadow: 6px 6px 6px 0
        rgba(0, 0, 0, ${(props: Props) => (props.erApen ? '.16' : '0')});
    z-index: 9999;

    ${liten} {
        width: ${(props: Props) => (props.erApen ? 'auto' : ikonSizePx)};
        height: ${(props: Props) => (props.erApen ? 'auto' : ikonSizePx)};
        border-radius: ${(props: Props) => (props.erApen ? '0' : '50%')};
        top: ${(props: Props) => (props.erApen ? '0' : undefined)};
        right: ${(props: Props) => (props.erApen ? '0' : '20px')};
        bottom: ${(props: Props) => (props.erApen ? '0' : '20px')};
        left: ${(props: Props) => (props.erApen ? '0' : undefined)};
        box-shadow: none;
        border: none;
    }
`;

export const FridaTekst = styled.span`
    padding-left: calc(${tekstHeightPx} * 0.4);
    padding-right: 10px;
    width: 100%;

    color: ${navDypBla};
    white-space: nowrap;
`;

export const FridaIkon = styled.span`
    border-radius: ${ikonSizePx};
    transition: transform 100ms ease-out;

    img {
        width: ${ikonSizePx};
        height: ${ikonSizePx};
    }
`;

export const FridaKnapp = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${tekstHeightPx};
    cursor: pointer;
    background-color: white;
    border: none;
    box-shadow: inset 0 0 0 2px ${navGra20};
    border-radius: ${tekstHeightPx};
    padding: 0;

    &:hover {
        background-color: ${navDypBla};

        ${FridaTekst} {
            color: white;
        }

        ${FridaIkon} {
            transform: scale(1.1);
        }
    }

    &:focus {
        box-shadow: inset 0 0 0 3px ${navDypBla} !important;

        ${FridaIkon} {
            box-shadow: 0 0 0 3px ${navDypBla};
        }
    }
`;
