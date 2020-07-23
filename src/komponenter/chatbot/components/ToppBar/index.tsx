import React, { Component } from 'react';

import minimerIkon from 'komponenter/chatbot/assets/minimer.svg';
import omstartIkon from 'komponenter/chatbot/assets/omstart.svg';
import avsluttIkon from 'komponenter/chatbot/assets/avslutt.svg';
import {
    Bar,
    Knapp,
    Knapper,
    Navn,
} from 'komponenter/chatbot/components/ToppBar/styles';
import { Bilde } from 'komponenter/common/bilde/Bilde';

export type ToppBarProps = {
    lukk: () => void;
    avslutt: () => void;
    omstart: () => void;
    navn: string | undefined;
};

export default class ToppBar extends Component<ToppBarProps, {}> {
    constructor(props: ToppBarProps) {
        super(props);
    }

    render() {
        const { lukk, omstart, avslutt, navn } = this.props;
        return (
            <Bar navn={this.props.navn || 'Chatbot Frida'}>
                <Navn>{navn}</Navn>
                <Knapper>
                    <Knapp
                        navn={this.props.navn || 'Chatbot Frida'}
                        onClick={lukk}
                        tabIndex={0}
                        aria-label={`Minimer ${this.props.navn}`}
                    >
                        <Bilde src={minimerIkon} />
                    </Knapp>
                    <Knapp
                        navn={this.props.navn || 'Chatbot Frida'}
                        onClick={omstart}
                        tabIndex={0}
                        aria-label={`Start ${this.props.navn} på nytt.`}
                    >
                        <Bilde src={omstartIkon} />
                    </Knapp>
                    <Knapp
                        navn={this.props.navn || 'Chatbot Frida'}
                        onClick={() => avslutt()}
                        tabIndex={0}
                        aria-label={`Avslutt ${this.props.navn}`}
                    >
                        <Bilde src={avsluttIkon} />
                    </Knapp>
                </Knapper>
            </Bar>
        );
    }
}
