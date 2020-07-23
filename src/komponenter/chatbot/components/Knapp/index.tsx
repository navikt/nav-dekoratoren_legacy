import React, { Component } from 'react';
import { KnappElement } from 'komponenter/chatbot/components/Knapp/styles';

export type KnappProps = {
    disabled?: boolean;
    aktiv?: boolean;
    prosent?: number;
};

export default class Knapp extends Component<KnappProps, {}> {
    render() {
        return (
            <KnappElement
                disabled={this.props.disabled}
                type="submit"
                aktiv={this.props.aktiv}
                tabIndex={0}
                prosent={this.props.prosent}
            >
                {this.props.children}
            </KnappElement>
        );
    }
}
